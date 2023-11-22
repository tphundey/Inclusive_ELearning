import { CommentOutlined, HeartOutlined, LikeOutlined, ShareAltOutlined } from "@ant-design/icons"

const Post = () => {
    return <>
        <main className="pt-8 lg:pt-16 bg-white dark:bg-gray-900 antialiased mb-10">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos" />
                                <div>
                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Thu Ngoc</a>
                                    <p className="text-base text-gray-500 dark:text-gray-400">Feb. 8, 2022</p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Về tôi</h1>
                    </header>
                    <p className="lead">Flowbite is an open-source library of UI components built with the utility-first
                        classNamees from Tailwind CSS. It also includes interactive elements such as dropdowns, modals,
                        datepickers.</p>
                    <br />
                    {/* img */}
                    <div className="mb-2">
                        <img src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png" alt="" />
                    </div>
                    <div className="flex items-center mb-2">
                        <p className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                            <HeartOutlined className="text-red-500" /> <LikeOutlined className="text-blue-500" /><span className="ml-1">16</span>
                        </p>
                    </div>
                    <div className="pb-1">
                        <hr />
                    </div>
                    <div className="mb-2 flex items-center">
                        <div className="text-m text-gray-500 font-semibold">
                            <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-20 ml-20">
                                < LikeOutlined /> <span className="ml-2">Thích</span>
                            </button>
                            <button className="inline-flex items-center px-1 -ml-1 flex-column mr-20">
                                <CommentOutlined /> <span className="ml-2">Bình luận</span>
                            </button>
                            <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                                <ShareAltOutlined /><span className="ml-2">Chia sẻ</span></button>
                        </div>
                    </div>
                    <hr className="shadow-lg text-red-500" />
                </article>
            </div>
        </main>
        {/* comment */}
        <div className="antialiased mx-auto max-w-screen-sm mb-20">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Tất cả bình luận</h3>
            <div className="space-y-4">
                <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                    </div>
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                        <strong>Thungoc</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                        <p className="text-sm">
                            gút gút
                        </p>
                        <div className="flex items-center">
                            <div className="text-sm text-gray-500 font-semibold">
                                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">20 giờ</button>
                                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">
                                    Thích
                                </button>
                                <button className="inline-flex items-center px-1 -ml-1 flex-column mb-5">
                                    Phản hồi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                        <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                    </div>
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                        <strong>Truong</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                        <p className="text-sm">
                            nâu nâu
                        </p>
                        <div className="flex items-center mb-5">
                            <div className="text-sm text-gray-500 font-semibold">
                                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">20 giờ</button>
                                <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">
                                    Thích
                                </button>
                                <button className="inline-flex items-center px-1 -ml-1 flex-column">
                                    Phản hồi
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex">
                                <div className="flex-shrink-0 mr-3">
                                    <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                                </div>
                                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                    <strong>Tai</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                                    <p className="text-xs sm:text-sm">
                                        clo clo
                                    </p>
                                    <div className="text-sm text-gray-500 font-semibold">
                                        <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">20 giờ</button>
                                        <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">
                                            Thích
                                        </button>
                                        <button className="inline-flex items-center px-1 -ml-1 flex-column">
                                            Phản hồi
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0 mr-3">
                                    <img className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
                                </div>
                                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                    <strong>Dat</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                                    <p className="text-xs sm:text-sm">
                                        a j no mo to
                                    </p>
                                    <div className="text-sm text-gray-500 font-semibold">
                                        <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">20 giờ</button>
                                        <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column mr-3">
                                            Thích
                                        </button>
                                        <button className="inline-flex items-center px-1 -ml-1 flex-column">
                                            Phản hồi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}
export default Post