import './BrowsePage.css'
import { NavLink, Outlet } from 'react-router-dom';

const Browsepage = () => {
    
    const tabs = [
        { label: 'Business', icon: 'fa-solid fa-chart-simple', path: 'business' },
        { label: 'Creative', icon: 'fa-regular fa-gem', path: 'creative' },
        { label: 'Technology', icon: 'fa-solid fa-suitcase', path: 'technology' },
        { label: 'Certifications', icon: 'fa-regular fa-file', path: 'certifications' }
    ];

    return (
        <div className='containerCss'>
            <div className="browsepage">
                <div className="browseleft">
                    <ul>
                        {tabs.map((tab, index) => (
                            <li key={index}>
                                <NavLink to={tab.path} >
                                    <i className={tab.icon}></i> {tab.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="browseright">
                    <Outlet />
                </div>
            </div>
        </div>
    )

};

export default Browsepage;
