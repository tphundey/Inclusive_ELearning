import './ContentPage.css'
import { NavLink, Outlet } from 'react-router-dom';

const CourseContentPage = () => {
    const tabs = [
        { label: 'Overview', icon: 'fa-solid fa-earth-americas', path: 'overview', },
        { label: 'Notebook', icon: 'fa-solid fa-book', path: 'notepage' }
    ];

    return (
        <div className='container-content-page'>
            <div className="contentpage-left">
                <div className="content-left-title">
                    <i className="fa-solid fa-list"></i>  <div>Contents</div>
                </div>
                <div className="content-left-title-course">
                    <div className="checkbox-container">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div>Manager relational data with PostgetSql</div><i className="fa-regular fa-bookmark"></i>
                </div>
                <div className="content-left-title-course">
                    <div className="checkbox-container">
                        <input type="checkbox" className="checkbox" />
                    </div>
                    <div>Manager relational data with PostgetSql</div><i className="fa-regular fa-bookmark"></i>
                </div>
                <div className="content-left-title-course">
                    <div className="checkbox-container">
                        <input type="checkbox" className="checkbox" />
                    </div>
                    <div>Manager relational data with PostgetSql</div><i className="fa-regular fa-bookmark"></i>
                </div>
                <div className="content-left-title-course">
                    <div className="checkbox-container">
                        <input type="checkbox" className="checkbox" />
                    </div>
                    <div>Manager relational data with PostgetSql</div><i className="fa-regular fa-bookmark"></i>
                </div>
                <div className="content-left-title-course">
                    <div className="checkbox-container">
                        <input type="checkbox" className="checkbox" />
                    </div>
                    <div>Manager relational data with PostgetSql</div><i className="fa-regular fa-bookmark"></i>
                </div>
            </div>
            <div className="contentpage-right">
                <div className="content-infocourse">
                    <div className="content-info-fl">
                        <div>
                            <div className="content-info1">
                                Microsoft Cybersecurity Architect (SC-100) Cert Prep: 2 Evaluate Governance Risk Compliance (GRC) Technical Strategies and Security</div>
                            <div className="content-info2">Module introduction</div>
                        </div>
                        <div className='fl-content-option'>
                            <i className="fa-regular fa-thumbs-up"></i> <span>23</span>
                            <i className="fa-regular fa-bookmark"></i>  <span>2304</span> |
                            <i className="fa-solid fa-share"></i>
                        </div>
                    </div>
                </div>
                <div className="content-container-video">
                    <video controls src="https://dms-exp3.licdn.com/playlist/vid/D4D0DAQFf25YPDSRSVQ/learning-original-video-vbr-720/0/1681425967788?e=1692994026&v=beta&t=Z_cPOli5JJvRhC36IdIWOoQW9kDjbCPoI4U3q77Age0"></video>
                </div>

                <div className="content-container-bottom">
                    <div className="content-nav">
                        <ul>
                            {tabs.map((tab, index) => (
                                <li key={index} className='flex gap-2'>
                                    <NavLink to={tab.path} >
                                        <i className={tab.icon} ></i> <span className='ml-2'>{tab.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CourseContentPage;
