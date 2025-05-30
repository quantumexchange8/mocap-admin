import Button from "@/Components/Button";
import { ClearIcon, ColumnIcon, DatePickerIcon, DefaultSortIcon, FilterIcon, SearchIcon, SortAsc, SortDesc, ViewIcon, XIcon } from "@/Components/Icon/Outline";
import SearchInput from "@/Components/SearchInput";
import { Checkbox, DatePicker, Popover, Select, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { formatDate, formatAmount } from "@/Composables";
import { NoRecordIllus } from "@/Components/Icon/Illustration";
import { Calendar } from "primereact/calendar";

export default function JobApplicants() {

    const [searchFilter, setSearchFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [getJobApplicant, setGetJobApplicant] = useState([]);
    const [getPosition, setGetPosition] = useState([]);
    const [sortOrder, setSortOrder] = useState(null); // applicant sort
    const [submissionSort, setSubmissionSort] = useState(null); // submission date sort
    const [expectedSalarySort, setExpectedSalarySort] = useState(null); // expected salary sort
    const [testMarkSort, setTestMarkSort] = useState(null); // test mark sort
    const [filterSubmissionDate, setFilterSubmissionDate] = useState(null); 
    const [filterPosition, setFilterPosition] = useState(null); 
    const [filterStatus, setFilterStatus] = useState(null); 
    const [visibleColumns, setVisibleColumns] = useState([
        'applicant',
        'submission_date',
        'position',
        'expected_salary',
        'test_mark',
        'status',
    ]);

    const columnOptions = [
        { label: 'Applicant', value: 'applicant' },
        { label: 'Submission Date', value: 'submission_date' },
        { label: 'Position Applied', value: 'position' },
        { label: 'Expected Salary', value: 'expected_salary' },
        { label: 'Test Mark', value: 'test_mark' },
        { label: 'Status', value: 'status' },
    ];

    // const onColumnChange = (checkedValues) => {
    //     setVisibleColumns(checkedValues);
    // };

    const fetchJobApplicant = async () => {
        setIsLoading(true);

        const hasFilter = filterSubmissionDate || filterPosition || (filterStatus && filterStatus.length > 0);

        if (hasFilter) {
            setIsLoading(true);
        }

        try {
            
            const response = await axios.get('/getJobApplicants', {
                params: {
                    submission_date: filterSubmissionDate,
                    position: filterPosition,
                    status: filterStatus,
                }
            });

            setGetJobApplicant(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchPosition = async () => {
        setIsLoading(true);
        try {
            
            const response = await axios.get('/getPosition');

            setGetPosition(response.data);

        } catch (error) {
            console.error('error', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosition();
    }, []);
    
    useEffect(() => {
        fetchJobApplicant();
    }, [filterSubmissionDate, filterPosition, filterStatus]);

    const clearFilter = () => {
        setSearchFilter('');
    }

    const columns = [
        {
            title: () => (
                <div className="flex items-center gap-2">
                Applicant
                <span className="text-gray-500 flex items-center gap-1">
                    {sortOrder === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        sortOrder === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        sortOrder === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            key: 'applicant',
            dataIndex: 'full_name',
            sorter: (a, b) => a.full_name.localeCompare(b.full_name),
            sortOrder,
            width: 200,
            fixed: 'left',
            onHeaderCell: () => ({
                onClick: () => {
                if (sortOrder === null) {
                    setSortOrder('ascend');
                } else if (sortOrder === 'ascend') {
                    setSortOrder('descend');
                } else {
                    setSortOrder(null);
                }
                }
            }),
            render: (_, record) => {
                return (
                    <div className="flex flex-col">
                        <div className="text-gray-950 font-medium text-sm max-w-[100px] truncate">{record.full_name}</div>
                        <div className="text-xs text-gray-500 max-w-[180px] truncate">{record.email}</div>
                    </div>
                )
            },
            ellipsis: true,
        }, 
        {
            title: () => (
                <div className="flex items-center gap-2">
                Submission Date
                <span className="text-gray-500 flex items-center gap-1">
                    {submissionSort === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        submissionSort === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        submissionSort === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            key: 'submission_date',
            dataIndex: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            sortOrder: submissionSort,
            width: 144,
            onHeaderCell: () => ({
                onClick: () => {
                if (submissionSort === null) {
                    setSubmissionSort('ascend');
                } else if (submissionSort === 'ascend') {
                    setSubmissionSort('descend');
                } else {
                    setSubmissionSort(null);
                }
                }
            }),
            render: (_, record) => {
                return (
                    <div className="flex flex-col">
                        {formatDate(record.created_at)}
                    </div>
                )
            },
            ellipsis: true,
        }, 
        {
            title: 'Position Applied',
            key: 'position',
            dataIndex: 'position',
            width: 142,
            // sort
        }, 
        {
            title: () => (
                <div className="flex items-center gap-2">
                Expected Salary
                <span className="text-gray-500 flex items-center gap-1">
                    {expectedSalarySort === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        expectedSalarySort === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        expectedSalarySort === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            key: 'expected_salary',
            dataIndex: 'expected_salary',
            width: 142,
            sorter: (a, b) => a.expected_salary.localeCompare(b.expected_salary),
            sortOrder: expectedSalarySort,
            onHeaderCell: () => ({
                onClick: () => {
                if (expectedSalarySort === null) {
                    setExpectedSalarySort('ascend');
                } else if (expectedSalarySort === 'ascend') {
                    setExpectedSalarySort('descend');
                } else {
                    setExpectedSalarySort(null);
                }
                }
            }),
            render: (_, record) => {
                return (
                    <div className="flex flex-col">
                        RM {formatAmount(record.expected_salary)}
                    </div>
                )
            },
            // sort
        }, 
        {
            title: () => (
                <div className="flex items-center gap-2">
                Test Mark
                <span className="text-gray-500 flex items-center gap-1">
                    {testMarkSort === null && <DefaultSortIcon className="w-4 h-4" />}
                    {
                        testMarkSort === 'ascend' && (
                            <>
                                <SortAsc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                    {
                        testMarkSort === 'descend' && (
                            <>
                                <SortDesc className="w-4 h-4 text-gray-950" />
                            </>
                        )
                    }
                </span>
                </div>
            ),
            key: 'test_mark',
            dataIndex: 'test_mark',
            width: 142,
            sorter: (a, b) => {
                return (a.test_mark ?? 0) - (b.test_mark ?? 0);
            },
            sortOrder: testMarkSort,
            onHeaderCell: () => ({
                onClick: () => {
                if (testMarkSort === null) {
                    setTestMarkSort('ascend');
                } else if (testMarkSort === 'ascend') {
                    setTestMarkSort('descend');
                } else {
                    setTestMarkSort(null);
                }
                }
            }),
            render: (_, record) => {
                return (
                    <div className="flex flex-col">
                        {record.test_mark ? <span>{record.test_mark} %</span> : '-'}
                    </div>
                )
            },
            // sort
        }, 
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: 142,
            render: (_, record) => {
                return (
                    <div className="flex">
                        {
                            record.status === 'pending_review' && (
                                <Tag bordered={false} color="warning" className='ant-tag-warning text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <span>Pending Review</span>
                                </Tag>
                            )
                        }
                        {
                            record.status === 'hired' && (
                                <Tag bordered={false} color="success" className='ant-tag-success text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <span>Hired</span>
                                </Tag>
                            )
                        }
                        {
                            record.status === 'rejected' && (
                                <Tag bordered={false} color="others" className='ant-tag-others text-xs font-medium py-1 px-2 flex items-center gap-1 m-0'>
                                    <span>Hired</span>
                                </Tag>
                            )
                        }
                    </div>
                )
            },
            // sort
        }, 
        {
            title: '',
            key: 'action',
            width: 100,
            align: 'center',
            fixed: 'right',
            render: (_, record) => {

                return (
                    <div className="flex items-center justify-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Tooltip placement="bottomRight" title='Evaluation Form'>
                            <div>
                                <Button iconOnly variant="text" size="sm" onClick={() => window.location.href = `/jobApplicant-evaluation/${record.id}`} >
                                    <ViewIcon />
                                </Button>
                            </div>
                        </Tooltip>
                    </div>
                )
            }
        }, 
    ];

    const filterJobApplicant = getJobApplicant.filter((applicant) =>
        applicant.full_name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const directEmployeeDetails = (record) => {
        window.location.href = `/jobApplicant-details/${record.id}`;
    };

    const clearDate = () => {

    }

    const onChange = (date, dateString) => {
        setFilterSubmissionDate(dateString);
    };

    const handleSelectChange = (selected) => {
        setFilterPosition(selected);
    }

    const getActiveFilterCount = () => {
        let count = 0;
    
        if (filterSubmissionDate) count += 1;
        if (filterPosition) count += 1;
        if (filterStatus?.includes('pending_review')) count += 1;
        if (filterStatus?.includes('hired')) count += 1;
        if (filterStatus?.includes('rejected')) count += 1;
    
        return count;
    };

    const clearAllFilter = () => {
        setFilterSubmissionDate(null);
        setFilterPosition(null);
        setFilterStatus(null);
    }
    

    const filteredColumns = columns.filter(col => col.key === 'action' || visibleColumns.includes(col.key));

    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div>
                    <Popover
                        content={
                            <div className="flex flex-col gap-4">
                                {
                                    columnOptions.map((opt) => {
                                        const isApplicant = opt.value === 'applicant'; // or the correct `dataIndex` key
                                        const isChecked = visibleColumns.includes(opt.value);

                                        return (
                                            <Checkbox
                                                key={opt.value}
                                                value={opt.value}
                                                checked={isChecked}
                                                disabled={isApplicant}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;

                                                    setVisibleColumns((prev) => {
                                                        if (checked) {
                                                            return [...prev, opt.value];
                                                        } else {
                                                            return prev.filter((val) => val !== opt.value);
                                                        }
                                                    });
                                                }}
                                            >
                                                {opt.label}
                                            </Checkbox>
                                        );
                                    })
                                }
                            </div>
                        }
                        placement="bottomLeft"
                        trigger="click"
                    >
                        <div>
                            <Button variant="outlined" size="sm" className="flex items-center gap-2">
                                <ColumnIcon />
                                Columns
                            </Button>
                        </div>
                    </Popover>
                </div>
                <div className="flex items-center gap-3">
                    {/* Filter */}
                    <div>
                        <Popover content={
                            <div className="flex flex-col max-w-[208px] w-[208px] ">
                                <div className="pt-4 pb-8 flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-gray-950 font-bold text-xs">Filter by Submission Date</div>
                                        <DatePicker
                                            onChange={onChange}
                                            className="w-full py-3 px-4"
                                            renderExtraFooter={() => null}
                                            superNextIcon={false}
                                            superPrevIcon={false}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-gray-950 font-bold text-xs">Filter by Position Applied</div>
                                        <Select 
                                            showSearch
                                            placeholder="Select"
                                            className="antd-select-custom focus:ring-offset-transparent"
                                            onChange={handleSelectChange}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={getPosition.map(position => ({
                                                label: position.name,
                                                value: position.name,
                                            }))}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-gray-950 font-bold text-xs">Filter by Status</div>
                                        <Checkbox.Group 
                                            options={[
                                                { label: 'Pending Review', value: 'pending_review' },
                                                { label: 'Hired', value: 'hired' },
                                                { label: 'Rejected', value: 'rejected' },
                                            ]}
                                            value={filterStatus}
                                            onChange={(checkedValues) => setFilterStatus(checkedValues)}
                                            className="flex flex-col gap-4 text-sm text-gray-950"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 w-full border-t border-gray-200">
                                    <Button size="sm" variant="outlined-danger" className="w-full flex justify-center" onClick={clearAllFilter}>
                                        Clear All
                                    </Button>
                                </div>
                            </div>
                        } placement="bottomRight" trigger="click" >
                            <div>
                                <Button variant="outlined" size="sm" className="flex items-center gap-2">
                                    <div><FilterIcon /></div>
                                    <div className="text-gray-950 text-sm">Filter</div>
                                    <div className="px-1 text-white text-xs bg-gray-950 rounded-sm flex items-center justify-center h-full">
                                        {getActiveFilterCount()}
                                    </div>
                                </Button>
                            </div>
                        </Popover>
                        
                    </div>
                    <div>
                        <SearchInput 
                            withIcon
                            IconComponent={SearchIcon}
                            placeholder='Search'
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                            dataValue={searchFilter != ''}
                            clearfunc={
                                <div className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer" onClick={clearFilter}>
                                    <XIcon className="w-4 h-4" />
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            <div>
                <Table 
                    columns={filteredColumns}
                    dataSource={isLoading ? [] : filterJobApplicant}
                    loading={isLoading}
                    pagination={{ 
                        position: ['bottomCenter'],
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '25', '50', '100'],
                        defaultPageSize: 10, 
                        showQuickJumper: false,
                        total: filterJobApplicant.length,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    }}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => directEmployeeDetails(record),
                    })}
                    scroll={{  y: '65vh' }}
                    locale={{
                    emptyText: (
                            <div className="flex flex-col justify-center items-center gap-3 text-center py-20 text-gray-400">
                                <div><NoRecordIllus /></div>
                                <span>No records found</span>
                            </div>
                        ),
                    }}
                />
            </div>
        </div>
    )
}