import './BecomeMentor.css'

const BecomeMentor = () => {

    return (
        <div>
            <div className="becomementor-header">
                <img src="https://f9-zpcloud.zdn.vn/5574791059015549867/62540c0a43f496aacfe5.jpg" alt="" />
            </div>
            <div className="becomementor-container">
                <div className="becomementorleft">
                    <h1>Become a LinkedIn Learning Instructor</h1>
                    <p className='mb-7'>Apply to join the passionate instructors who share their expertise and knowledge with the world! </p>
                    <p className=''>As a LinkedIn Learning instructor, you can:</p>
                    <ul>
                        <li>Collaborate with some of the industry's top instructional designers, producers, directors, and editors to create valuable learning content.</li>
                        <li>Help millions of learners reach professional and personal goals.</li>
                        <li>Connect, engage, and grow with our active community of LinkedIn Learning Instructors.</li>
                        <li>Earn extra income.</li>
                    </ul>
                    <b>Apply Now!</b> <br /><br />
                    <p>If you're interested in becoming an instructor, please apply on this form. You'll see a field for a sample movie, and you can review our <span className='become-span'>  sample movie guidelines</span> to understand what we're looking for. After you submit the form, we will reach out to you if there's a good fit. Please note that we can't respond to every application, but we do keep all submissions for future consideration.
                    </p>
                </div>
                <div className="becomementorright">
                    <h2>Instructor Application</h2>
                    <form action="" method="post">
                        <input className='becomementor-input' placeholder='First name*' type="text" />
                        <input className='becomementor-input' placeholder='Last name*' type="text" />
                        <input className='becomementor-input' placeholder='Email*' type="text" />
                        <p>Are you a part of any of the following LinkedIn programs? (Please check all that apply.)is a required field*</p>

                        <div className='flex gap-2 mb-2'>
                            <input className='becomementor-checkbox' type="checkbox" name="" id="" /><label htmlFor="">LinkedIn Influencer</label>
                        </div>
                        <div className='flex gap-2 mb-2'>
                            <input className='becomementor-checkbox' type="checkbox" name="" id="" /><label htmlFor="">Managed Power Creator</label>
                        </div>
                        <div className='flex gap-2 mb-2'>
                            <input className='becomementor-checkbox' type="checkbox" name="" id="" /><label htmlFor="">Top Voice</label>
                        </div>
                        <div className='flex gap-2 mb-2'>
                            <input className='becomementor-checkbox' type="checkbox" name="" id="" /><label htmlFor="">Other (working with LinkedIn in any other capacity)</label>
                        </div>
                        <input className='becomementor-input2 mt-4' placeholder='In what topics are you considered to be an expert?*' type="text" />
                    <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BecomeMentor;
