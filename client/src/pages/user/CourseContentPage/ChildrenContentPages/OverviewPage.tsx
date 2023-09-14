import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OverViewPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mentor, setMentor] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:1337/api/courses/${id}`)
            .then((response) => {
                // Lưu thông tin sản phẩm vào state
                console.log(response.data);
                const productData = response.data.data.attributes;
                setProduct(productData);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    useEffect(() => {
        // Kiểm tra xem có dữ liệu khóa học không
        if (product) {
            // Gọi API lấy thông tin mentor dựa trên ID sản phẩm
            axios.get(`http://localhost:1337/api/author-courses/${product.mentorId}`)
                .then((response) => {
                    // Lưu thông tin mentor vào state
                    console.log(response.data);
                    const mentorData = response.data.data.attributes;
                    setMentor(mentorData);
                })
                .catch((error) => {
                    console.error('Error fetching mentor data:', error);
                });
        }
    }, [product]);

    console.log(mentor);
    if (!product) {
        return <div>Loading...</div>;
    }


    return (
        <div className="flex gap-10 ">
            <div className="content-overview-left">
                <div className="content-structor mt-4">
                    INSTRUCTORS
                </div>
                <div className="content-structor-main">
                    <div className="content-structor-main-avatar">
                        <img src={mentor?.mentorImg} alt="" />
                    </div>
                    <div className="content-structor-main-name">
                        <div className="children-structor-main">
                            <div className='children-structor-main-name'>
                                {mentor?.mentorName}
                            </div>
                            <div>
                                <button>Show all course</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="coursedetails">
                    <div className="text-xl font-medium mt-6">Course details</div>
                    <div className="info-details">
                        <div className="info15">{product.duration} m</div>
                        <div><i className="fa-solid fa-circle"></i></div>
                        <div className="info15">{product.level}</div>
                        <div><i className="fa-solid fa-circle"></i></div>
                        <div className="info15">Released: {product.publishedDate}</div>
                    </div>

                    <div className="course-detail-main">
                        {product.description}
                    </div>
                    <div className='font-medium text-xl mt-6'>
                        Instructors
                    </div>
                    <div className="instructors">
                        <div className="instructors-children">
                            <div className="instruc-left">
                                <img src={mentor?.mentorImg} alt="" />
                            </div>
                            <div className="instruc-right">
                                <h1>{mentor?.mentorName}</h1>
                                <h2>Microsoft</h2>
                                <h3><a href="">Follow on LinkedIn</a></h3>
                            </div>
                        </div>
                    </div>
                    <div className='font-medium text-xl mt-6'>
                        Learner reviews
                    </div>
                    <div className="flex">
                        <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                            <div className="p-6">
                                <div className="flex items-center gap-2">
                                    <div className='preview'>
                                        <div className='mt-4'> <span><span className='text-4xl font-bold text-black'>4.1</span> out 5</span></div>
                                        <div className="flex items-center gap-2">
                                            <div className="mt-3">
                                                <span className="text-sm rounded text-slate-500 ">
                                                    <span className="flex gap-1 text-amber-400" role="img" aria-label="Rating: 4 out of 5 stars">
                                                        <span aria-hidden="true">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span aria-hidden="true">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span aria-hidden="true">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span aria-hidden="true">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span aria-hidden="true">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                            </svg>
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>

                                            <div className='mt-3'>
                                                <span className="text-xs leading-6 text-slate-400">147 ratings</span>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="flex flex-col w-full gap-4 pt-6">
                                        <span className="flex items-center w-full gap-2">
                                            <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 5 star</label>
                                            <progress aria-labelledby="p03e-label" id="p03e" max="100" value="75" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                            <span className="text-xs font-bold w-9 text-slate-700">112 </span>
                                        </span>
                                        <span className="flex items-center w-full gap-2">
                                            <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 4 star</label>
                                            <progress aria-labelledby="p03e-label" id="p03e" max="100" value="28" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                            <span className="text-xs font-bold w-9 text-slate-700">17 </span>
                                        </span>
                                        <span className="flex items-center w-full gap-2">
                                            <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 3 star</label>
                                            <progress aria-labelledby="p03e-label" id="p03e" max="100" value="18" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                            <span className="text-xs font-bold w-9 text-slate-700">12 </span>
                                        </span>
                                        <span className="flex items-center w-full gap-2">
                                            <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 2 star</label>
                                            <progress aria-labelledby="p03e-label" id="p03e" max="100" value="8" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                            <span className="text-xs font-bold w-9 text-slate-700">2 </span>
                                        </span>
                                        <span className="flex items-center w-full gap-2">
                                            <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 1 star</label>
                                            <progress aria-labelledby="p03e-label" id="p03e" max="100" value="10" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                            <span className="text-xs font-bold w-9 text-slate-700">4 </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="listReviewIntro">
                        <div className="reviewIntroChildren">
                            <div className="avatarReview">
                                <img src="https://media.licdn.com/dms/image/D4D03AQFHdKhigXDCTw/profile-displayphoto-shrink_100_100/0/1676469208362?e=1697673600&v=beta&t=IM0tzv7FT7C1yMw2YRUO0ex4My7bFhG5GPvM8ubez-0" alt="" />
                            </div>
                            <div className="desReview">
                                <div className="desrv1">Amanda</div>
                                <div className="desrv2">Engaging and Well-taught.</div>
                                <div className="flex items-center gap-10">
                                    <div className="desrv3"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                    </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg></div>
                                    <div className="desrv4">August 2, 2023</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
            <div className="content-overview-right">
                <h2 className='text-xl font-medium p-3 mt-5'>Related courses</h2>
                <ul className="divide-y divide-slate-100">
                    <li className="flex items-start gap-4 px-4 py-3">
                        <div className="flex items-center shrink-0">
                            <img src="https://media.licdn.com/dms/image/C560DAQH0Lz0YLTK3DA/learning-public-crop_144_256/0/1663006019313?e=1693645200&v=beta&t=-0KxqZCRCizP0UW2pWEO1EOjlNVmmLkeg1YXI2BQEBs" alt="product image" className="w-32 rounded" />
                        </div>
                        <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 className='text-xs'>COURSE</h4>
                            <h4 className="text-base text-slate-700 font-medium"><a href="">Cybersecurity Awareness: Phishing Attacks</a></h4>
                            <p className="w-full text-xs text-slate-500 mt-3">45,750 learners</p>
                            <span className='timeforvideoIntro'>1h 23m</span>
                        </div>
                    </li>
                    <hr />

                    <li className="flex items-start gap-4 px-4 py-3">
                        <div className="flex items-center shrink-0">
                            <img src="https://media.licdn.com/dms/image/C560DAQFO4OcRJ7bllQ/learning-public-crop_144_256/0/1645639710937?e=1693645200&v=beta&t=SrVrZ_1DHB9QjU3Vw7WC0btggG_arfPSOl6yuutJXiQ" alt="product image" className="w-32 rounded" />
                        </div>
                        <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 className='text-xs'>COURSE</h4>
                            <h4 className="text-base text-slate-700 font-medium"><a href="">Cybersecurity Awareness: Phishing Attacks</a></h4>
                            <p className="w-full text-xs text-slate-500 mt-3">45,750 learners</p>
                            <span className='timeforvideoIntro'>1h 23m</span>
                        </div>
                    </li>
                    <hr />

                    <li className="flex items-start gap-4 px-4 py-3">
                        <div className="flex items-center shrink-0">
                            <img src="https://media.licdn.com/dms/image/C4D0DAQH8V_1fJ51xLA/learning-public-crop_144_256/0/1663880162126?e=1693645200&v=beta&t=0J3wEwZ9kyqTGwj4fN0cXBInoLWZK8A0HPgXBTW9Kx4" alt="product image" className="w-32 rounded" />
                        </div>
                        <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 className='text-xs'>COURSE</h4>
                            <h4 className="text-base text-slate-700 font-medium"><a href="">Cybersecurity Awareness: Phishing Attacks</a></h4>
                            <p className="w-full text-xs text-slate-500 mt-3">45,750 learners</p>
                            <span className='timeforvideoIntro'>1h 23m</span>
                        </div>
                    </li>
                    <hr />

                    <li className="flex items-start gap-4 px-4 py-3">
                        <div className="flex items-center shrink-0">
                            <img src="https://media.licdn.com/dms/image/C4D0DAQH8V_1fJ51xLA/learning-public-crop_144_256/0/1663880162126?e=1693645200&v=beta&t=0J3wEwZ9kyqTGwj4fN0cXBInoLWZK8A0HPgXBTW9Kx4" alt="product image" className="w-32 rounded" />
                        </div>
                        <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 className='text-xs'>COURSE</h4>
                            <h4 className="text-base text-slate-700 font-medium"><a href="">Cybersecurity Awareness: Phishing Attacks</a></h4>
                            <p className="w-full text-xs text-slate-500 mt-3">45,750 learners</p>
                            <span className='timeforvideoIntro'>1h 23m</span>
                        </div>
                    </li>
                    <hr />

                    <li className="flex items-start gap-4 px-4 py-3">
                        <div className="flex items-center shrink-0">
                            <img src="https://media.licdn.com/dms/image/C4D0DAQH8V_1fJ51xLA/learning-public-crop_144_256/0/1663880162126?e=1693645200&v=beta&t=0J3wEwZ9kyqTGwj4fN0cXBInoLWZK8A0HPgXBTW9Kx4" alt="product image" className="w-32 rounded" />
                        </div>
                        <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 className='text-xs'>COURSE</h4>
                            <h4 className="text-base text-slate-700 font-medium"><a href="">Cybersecurity Awareness: Phishing Attacks</a></h4>
                            <p className="w-full text-xs text-slate-500 mt-3">45,750 learners</p>
                            <span className='timeforvideoIntro'>1h 23m</span>
                        </div>
                    </li>
                    <hr />

                    <li className="flex items-start gap-4 px-4 py-3">
                        <div className="flex items-center shrink-0">
                            <img src="https://media.licdn.com/dms/image/C4D0DAQH8V_1fJ51xLA/learning-public-crop_144_256/0/1663880162126?e=1693645200&v=beta&t=0J3wEwZ9kyqTGwj4fN0cXBInoLWZK8A0HPgXBTW9Kx4" alt="product image" className="w-32 rounded" />
                        </div>
                        <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 className='text-xs'>COURSE</h4>
                            <h4 className="text-base text-slate-700 font-medium"><a href="">Cybersecurity Awareness: Phishing Attacks</a></h4>
                            <p className="w-full text-xs text-slate-500 mt-3">45,750 learners</p>
                            <span className='timeforvideoIntro'>1h 23m</span>
                        </div>
                    </li>
                    <hr />
                </ul>
            </div>
        </div>
    )

};

export default OverViewPage;
