import Button from "@/Components/Button";
import { Activity, Announcement, Assets, Attendance, Authority, Bonus, CalendarIcon, Dashboard, Department, Employee, ExternalMember, PerformanceData, PoolFund, ProjectFolder, Request, SalaryIncrement, SalaryProfile, Setting, SmartData, Tickets, VersionHistory } from "@/Components/Icon/Outline";
import { FemaleAvatar, MaleAvatar } from "@/Components/Icon/ProfilePhoto";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Calendar, Switch } from "antd";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function NewAdministrator({
    fetchAdministrator,
    isNewAdminOpen,
    setIsNewAdminOpen,
    closeNewAdmin,
    getEmployees,
}) {

    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        admin: '',
        title: '',
        dashboard: false,
        request: false,
        calendar: false,
        announcement: false,
        report: false,

        employee_listing: false,
        attendance: false,
        payslip: false,
        performance_data: false,

        department: false,

        project: false,
        completed: false,

        salary_increment: false,
        year_end: false,

        assets: false,
        pooled: false,

        administrator: false,
        external_member: false,
        smart_data: false,
        setting: false,

        activity_log: false,
        version_history: false,
    });

    const itemTemplate = (option) => (
        <div className="flex items-center gap-3">
            {
                option.profile_image ? (
                    <img
                        src={option.profile_image}
                        alt="profile"
                        className="w-5 h-5 rounded-full"
                    />
                ) : (
                    <>
                        {
                            option.gender === 'male' ? (
                                <div >
                                    <MaleAvatar className="w-5 h-5 rounded-full " />
                                </div>
                                
                            ) : (
                                <FemaleAvatar className="w-5 h-5 rounded-full" />
                            )
                        }
                    </>
                )
            }
            <span>{option.label}</span>
        </div>
    );
    
    const groupTemplate = (option) => (
        <div>{option.label}</div>
    );

    const groupedOptions = getEmployees.reduce((acc, employee) => {
        const deptName = employee?.department?.name;

        const existingGroup = acc.find(group => group.label === deptName);
        const employeeOption = {
            label: employee.name,
            value: employee.id,
            profile_image: employee.profile_image
        };

        if (existingGroup) {
            existingGroup.items.push(employeeOption);
        } else {
            acc.push({
                label: deptName,
                items: [employeeOption],
            });
        }

        return acc;
    }, []);

    const closeNewAdminModal = () => {
        reset();
        closeNewAdmin();
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        post('/create-administrator', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                closeNewAdminModal();
                fetchAdministrator();

                toast.success('You’ve successfully added a new administrator!', {
                    title: `You’ve successfully added a new administrator!`,
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        });
    }

    return (
        <>
            <Modal
                show={isNewAdminOpen}
                maxWidth='md'
                title='New Administrator'
                onClose={closeNewAdminModal}
                footer={
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button variant="outlined" size="sm" onClick={closeNewAdminModal}>Cancel</Button>
                        <Button size="sm" onClick={submit}>Add</Button>
                    </div>
                }
            >
                <div className="py-3 px-6 flex flex-col gap-8">
                    <div className="text-gray-700 text-sm">
                        Granting admin access will allow the selected employee to log into the Motion Capture Back-Office and access granted features.
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value='Administrator' />
                        <Dropdown 
                            value={data.admin} 
                            onChange={(e) => setData('admin', e.value)} 
                            options={groupedOptions}
                            optionGroupLabel="label"
                            optionGroupChildren="items"
                            itemTemplate={itemTemplate}
                            optionGroupTemplate={groupTemplate}
                            filter
                            pt={{
                                root: { className: 'border border-gray-300 rounded-sm px-4 py-3 text-gray-950 focus-within:border-gray-950 transition-colors duration-200' }, // main box
                                panel: { className: 'p-dropdown-panel bg-white border border-gray-300 shadow-lg mt-0.5 rounded-sm px-1 py-3' }, // dropdown list
                                item: ({ context }) => ({
                                    className: `px-4 py-2 text-sm text-gray-950 hover:bg-gray-100 cursor-pointer ${
                                        context.selected ? 'bg-gray-950 font-semibold text-white hover:bg-gray-800 ' : ''
                                    }`
                                }),
                                
                                itemGroup: { className: 'px-4' },
                                itemGroupLabel: { className: 'text-gray-500 text-xs' },
                                filterInput: { className: 'px-4 py-2 text-sm border border-gray-300 rounded-sm ' },
                                filterContainer: { className: 'p-2'}
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <InputLabel value='Title' />
                        <TextInput 
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <span className="text-gray-500 text-xs">
                            Enter a descriptive title for the administrator's role, such as 'HR Manager' to define their responsibilities.
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-gray-700 text-sm">
                            Manage Permissions
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">general</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Dashboard /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Dashboard</div>
                                            <div className="text-gray-500 text-xs">A quick overview of key metrics, tasks, and system activity at a glance.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.dashboard}
                                                onChange={(checked) => setData('dashboard', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Request /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Requests</div>
                                            <div className="text-gray-500 text-xs">Manage and track leave applications and various type of claims.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.request}
                                                onChange={(checked) => setData('request', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><CalendarIcon /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Calendar</div>
                                            <div className="text-gray-500 text-xs">View and manage important dates, meetings, and events.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.calendar}
                                                onChange={(checked) => setData('calendar', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Announcement /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Announcement</div>
                                            <div className="text-gray-500 text-xs">Create and distribute company-wide announcements to employees.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.announcement}
                                                onChange={(checked) => setData('announcement', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">employee</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Employee /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Employee Listing</div>
                                            <div className="text-gray-500 text-xs">View, manage, and edit employee details and records.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.employee_listing}
                                                onChange={(checked) => setData('employee_listing', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Attendance /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Attendance</div>
                                            <div className="text-gray-500 text-xs">Track employee attendance, work hours, and leave records.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.attendance}
                                                onChange={(checked) => setData('attendance', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><SalaryProfile /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Payslips</div>
                                            <div className="text-gray-500 text-xs">Manage and organise employee salary details.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.payslip}
                                                onChange={(checked) => setData('payslip', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><PerformanceData /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Performance Data</div>
                                            <div className="text-gray-500 text-xs">Monitor employee performance metrics and progress reports.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.performance_data}
                                                onChange={(checked) => setData('performance_data', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">department</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Department /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Department Listing</div>
                                            <div className="text-gray-500 text-xs">View and organise departments and their respective employees.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.department}
                                                onChange={(checked) => setData('department', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">work</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><ProjectFolder /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Projects</div>
                                            <div className="text-gray-500 text-xs">Manage ongoing and upcoming projects, including assigned teams.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.project}
                                                onChange={(checked) => setData('project', checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Tickets /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Completed</div>
                                            <div className="text-gray-500 text-xs">Track and review completed tasks or projects.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.completed}
                                                onChange={(checked) => setData('completed', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">benefits</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><SalaryIncrement /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Salary Increment</div>
                                            <div className="text-gray-500 text-xs">Manage salary adjustments and increments for employees.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.salary_increment}
                                                onChange={(checked) => setData('salary_increment', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Bonus /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Year-End Bonus</div>
                                            <div className="text-gray-500 text-xs">Handle year-end bonuses and incentive allocations.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.year_end}
                                                onChange={(checked) => setData('year_end', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">company</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Assets /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Assets & Stocks</div>
                                            <div className="text-gray-500 text-xs">Manage company assets, stock levels, and inventory.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.assets}
                                                onChange={(checked) => setData('assets', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><PoolFund /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Pooled Fund</div>
                                            <div className="text-gray-500 text-xs">Monitor and manage pooled financial resources and funds.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.pooled}
                                                onChange={(checked) => setData('pooled', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">CONFIGURATION</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Authority /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Administrators</div>
                                            <div className="text-gray-500 text-xs">Set user roles and permissions for accessing different parts of the system.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.administrator}
                                                onChange={(checked) => setData('administrator', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><ExternalMember /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">External Members</div>
                                            <div className="text-gray-500 text-xs">Manage members who are non-employee in the system.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.external_member}
                                                onChange={(checked) => setData('external_member', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><SmartData /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Smart Data</div>
                                            <div className="text-gray-500 text-xs">Analyse and leverage data insights to optimise decision-making.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.smart_data}
                                                onChange={(checked) => setData('smart_data', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Setting /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Settings</div>
                                            <div className="text-gray-500 text-xs">Configure system preferences, company policies, and portal settings.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.setting}
                                                onChange={(checked) => setData('setting', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="text-gray-500 text-xxs uppercase">system</div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><Activity /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Activity Log</div>
                                            <div className="text-gray-500 text-xs">Track others' actions for transparency and accountability.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.activity_log}
                                                onChange={(checked) => setData('activity_log', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="max-w-7 w-full p-1.5 bg-gray-100 rounded-sm"><VersionHistory /></div>
                                        <div className="w-full flex flex-col">
                                            <div className="text-gray-950 text-sm font-medium">Version History</div>
                                            <div className="text-gray-500 text-xs">View system updates and feature changes made by developers.</div>
                                        </div> 
                                        <div className="">
                                            <Switch 
                                                checked={data.version_history}
                                                onChange={(checked) => setData('version_history', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}