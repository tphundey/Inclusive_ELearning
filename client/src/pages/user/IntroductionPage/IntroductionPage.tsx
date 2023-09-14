import './introduction.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating, Typography } from "@material-tailwind/react";
import Input from 'antd/es/input/Input';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { Form } from 'antd';
import { Link } from 'react-router-dom';

const IntroductionPage = () => {
    const [rated, setRated] = React.useState(4);
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
        <div className="containerCss">
            <div className="course-header-container">
                <div className="course-overview-header">
                    <div className="courseLeft">
                        <a className='courseLeft-ah1' href="">{product.title}</a>
                        <div className="course-span-left mt-3">
                            <span>{product.level}</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>{product.duration} m</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>Released: {product.publishedDate}</span>
                        </div>
                        <div className="course-span-left">
                            <span>4.6</span>
                            <span className=' flex text-yellow-400'>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                            </svg>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg></span>
                            <span>(240)</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>{product.enrollments} learners</span>
                        </div>
                        <div className='flex gap-4 intro-bt'>
                            <Link to={`/content/${id}`}>
                                <button className='intro-bt1'>Start my free month</button>   </Link>
                            <button className='intro-bt2'>Buy for my team</button>
                        </div>
                    </div>

                    <div className="courseRight">
                        <button><i className="fa-solid fa-play"></i> Preview</button>
                    </div>

                </div>
            </div>
            <div className="imgHid">
                <img src={product.imageurl} alt="" />
            </div>
            <hr />
            <div className="flex">
                <div className="course-body-intro">
                    <span className='course-intro-sp1'>WHAT’S INCLUDED</span>
                    <div className="included-phone">
                        <div><i className="fa-solid fa-mobile-screen ml-1"></i> Access on tablet and phone</div>
                        <div><i className="fa-regular fa-newspaper"></i>Certificate of completion</div>
                    </div>
                    <div className="courseDescription">
                        <div className="titleCourseDescription">Course description</div>
                        <p>{product.description}</p>
                    </div>
                    <div className="courseDescription">
                        <div className="titleCourseDescription">Shareable certificate</div>
                        <div className="certificate mt-4" >
                            <div className="certiLeft">
                                <img src="https://static.licdn.com/aero-v1/sc/h/35xqn2j8lu3c1pgwy1r6hrdoj" alt="" />
                            </div>
                            <div className="certiRight">
                                <img src="https://f10-zpcloud.zdn.vn/1128982520427566380/4fb638b9f0c1229f7bd0.jpg" alt="" />
                                <div className='font-medium'>
                                    Certificate of Completion
                                </div>
                                <div>
                                    <ul>
                                        <li> <i className="fa-solid fa-check"></i>Showcase on your LinkedIn profile under the "Licenses and Certificates" section</li>
                                        <li><i className="fa-solid fa-check"></i>Download or print out as PDF to share with others</li>
                                        <li><i className="fa-solid fa-check"></i>Share as image online to demonstrate your skill</li>
                                    </ul>
                                </div>
                            </div>
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
                                    <h3><a href="">View more courses by Microsoft Press</a></h3>
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
                        <Form className='mt-7 formReview' action="" method="post" >
                            <div className="gap-2">
                                <div className='flex items-center gap-2'>
                                    <Rating className='flex text-yellow-400' value={4} onChange={(value) => setRated(value)} />
                                    <Typography className="font-medium mb-4 text-yellow-400">
                                        {rated}.0
                                    </Typography>
                                </div>
                                <Input></Input>
                                <Button className='mt-4' type='dashed'>Post</Button>
                            </div>
                        </Form>

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
                    </div>

                </div>
                <div className='introducation-right'>
                    <h2 className='text-xl font-medium p-3 mt-5'>Related courses</h2>
                    <ul className="divide-y divide-slate-100">
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex items-center shrink-0">
                                <img src="https://media.licdn.com/dms/image/C560DAQFO4OcRJ7bllQ/learning-public-crop_144_256/0/1645639710937?e=1692658800&v=beta&t=yRKv_ZP00gdyD43ST8H8USZAZHKCc3XvCtxBmGkboIU" alt="product image" className="w-32 rounded" />
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
                                <img src="https://media.licdn.com/dms/image/C560DAQH0Lz0YLTK3DA/learning-public-crop_144_256/0/1663006019313?e=1692658800&v=beta&t=Q50EtqZjwwp8m4tj0_O10kakYsrFESxin1zmaOz5feE" alt="product image" className="w-32 rounded" />
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
                                <img src="https://media.licdn.com/dms/image/C560DAQHtdXQZyMfd1Q/learning-public-crop_144_256/0/1660846179936?e=1692658800&v=beta&t=iObJx_KFbCczDZSnAeaYdnzGxCumSq_j0vx7YSPOt3s" alt="product image" className="w-32 rounded" />
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
                                <img src="https://media.licdn.com/dms/image/C560DAQFO4OcRJ7bllQ/learning-public-crop_144_256/0/1645639710937?e=1692658800&v=beta&t=yRKv_ZP00gdyD43ST8H8USZAZHKCc3XvCtxBmGkboIU" alt="product image" className="w-32 rounded" />
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
                                <img src="https://media.licdn.com/dms/image/C560DAQFO4OcRJ7bllQ/learning-public-crop_144_256/0/1645639710937?e=1692658800&v=beta&t=yRKv_ZP00gdyD43ST8H8USZAZHKCc3XvCtxBmGkboIU" alt="product image" className="w-32 rounded" />
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
                                <img src="https://media.licdn.com/dms/image/C560DAQFO4OcRJ7bllQ/learning-public-crop_144_256/0/1645639710937?e=1692658800&v=beta&t=yRKv_ZP00gdyD43ST8H8USZAZHKCc3XvCtxBmGkboIU" alt="product image" className="w-32 rounded" />
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
        </div>
    )
}

export default IntroductionPage