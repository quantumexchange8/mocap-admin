import Button from "@/Components/Button";
import { DotVerticalIcon, GripVerticalIcon, SendIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dropdown, Mentions } from "antd";
import toast from "react-hot-toast";
import axios from "axios";

export default function Comment({ announcements, isCommendOpen, setIsCommentOpen, closeComment }) {

    const [getComment, setGetComment] = useState([]);
    const [getUser, setGetUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [selectedReply, setSelectedReply] = useState(null);

    const fetchComment = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getAnnouncementComment', {
                params: {
                    id: announcements.id
                }
            });
            setGetComment(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchUser = async () => {
        setIsLoading(true);
        
        try {
            
            const response = await axios.get('/getUserListing');
            setGetUser(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchComment();
        fetchUser();
    }, []);

    const { data, setData, post, processing, errors, isDirty, reset } = useForm({
        id: announcements.id,
        comment: '',
        reply_comment_id: ''
    });

    const replyUser = (comment) => {
        const username = comment.user.username;
        setSelectedReply(comment);
        setData('comment', `@${username} `); // auto-fill mention
        setData('reply_comment_id', comment.id);
    }

    const deleteComment = async (comment) => {
       try {

            const response = await axios.post('/delete-selected-comment', {
                params: {
                    id: comment.id,
                }
            })

            if (response.status === 200) {
                fetchComment();
                toast.success('Comment deleted!', {
                    title: 'Comment deleted!',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        
       } catch (error) {
            console.error('error', error);
       }
    }

    const sendComment = (e) => {
        e.preventDefault();
        setIsLoading2(true);

        post('/send-comment', {
            onSuccess: () => {
                toast.success('Announcement published successfully!', {
                    title: 'Announcement published successfully!',
                    duration: 3000,
                    variant: 'variant1',
                });
                closeComment();
                reset();
                setIsLoading2(false);
            },
        })
    }

    return (
        <>
            {
                isLoading ? (
                    <Modal
                        show={isCommendOpen}
                        maxWidth='md'
                        title='Comment'
                        onClose={closeComment}
                        showFooter="hidden"
                    >
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-h-[30vh] flex items-center justify-center"
                        >
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                        </motion.div>
                        <div className="w-full py-4 px-6 flex justify-between items-center">
                            <div>
                                <TextInput 
                                    id="comment"
                                    type="text"
                                    name="comment"
                                    value={data.comment}
                                    placeholder="Write a comment..."
                                    isFocused={false}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    hasError={!!errors.comment}
                                    className="border-none"
                                />
                            </div>
                            <Button variant="text" size="sm" iconOnly ><SendIcon className='text-gray-950' /></Button>
                        </div>
                    </Modal>
                ) : (
                    <Modal
                        show={isCommendOpen}
                        maxWidth='md'
                        title='Comment'
                        onClose={closeComment}
                        showFooter="hidden"
                    >
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="py-3 px-6 flex flex-col"
                        >
                            <div className="flex flex-col gap-8">
                                {
                                    getComment.length > 0 ? (
                                        <>
                                            {
                                                getComment.map((comment, index) => {

                                                    const items = [
                                                        {
                                                          key: '1',
                                                          label: (
                                                            <div onClick={() => deleteComment(comment)}>
                                                              Delete
                                                            </div>
                                                          ),
                                                        },
                                                    ];

                                                    return (
                                                        <div key={index} className="flex gap-3">
                                                            <div>
                                                                <img src="" alt="" />
                                                            </div>
                                                            <div className="flex flex-col gap-1 w-full">
                                                                <div className="flex justify-between items-center w-full ">
                                                                    <div className="w-full">{comment.user.username}</div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Button variant="text" size="sm" onClick={() => replyUser(comment)}>Reply</Button>
                                                                        <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']}>
                                                                            <div onClick={(e) => e.preventDefault()}>
                                                                                <Button variant="text" size="sm" iconOnly ><DotVerticalIcon /></Button>
                                                                            </div>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                                <div className="text-gray-950 text-sm">
                                                                    {comment.comment_text}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    ) : (
                                        <div className="text-gray-500 text-sm flex justify-center items-center">
                                            No comment yet
                                        </div>
                                    )
                                }
                            </div>
                        </motion.div>
                        <div className="w-full py-4 px-6 flex justify-between items-center">
                            <div className="w-full">
                                <Mentions
                                    loading={isLoading}
                                    value={data.comment}
                                    onChange={(value) => setData('comment', value)}
                                    options={getUser.map((item) => ({
                                        label: item.username,
                                        value: item.username,
                                    }))}
                                    variant="borderless"
                                    placeholder="Write a comment..."
                                />
                            </div>
                            <Button variant="text" size="sm" iconOnly onClick={sendComment} ><SendIcon className='text-gray-950' /></Button>
                        </div>
                    </Modal>

                )
            }
        </>
    )
}