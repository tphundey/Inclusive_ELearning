import { SearchOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import './ChatsPage.css'

const Chats = () => {
    return <>
        <div>
            <div className="w-full h-32"></div>

            <div className="container mx-auto mr-t">
                <div className="py-6 h-screen">
                    <div className="flex border border-grey rounded shadow-lg h-full">

                        {/* Left */}
                        <div className="w-1/3 border flex flex-col">

                            {/* Header  */}
                            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                <div>
                                    <img className="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png" />
                                </div>

                                <div className="flex">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                                    </div>
                                    <div className="ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                                    </div>
                                    <div className="ml-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            {/* Thanh tìm kiếm */}
                            <div className='ml-2 mr-2 mb-4 mt-4 border border-solid rounded-full'>
                                <div className="relative flex items-center h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden">
                                    <div className="grid place-items-center h-full w-12 text-gray-300">
                                    <SearchOutlined />
                                    </div>
                                    <input
                                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                        type="text"
                                        id="search"
                                        placeholder="Search something.." />
                                </div>
                            </div>

                            {/* hiện tin nhắn(bên trái) */}
                            <div className="bg-grey-lighter flex-1 overflow-auto">
                                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                    <div>
                                        <img className="h-12 w-12 rounded-full"
                                            src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                                    </div>
                                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                        <div className="flex items-bottom justify-between">
                                            <p className="text-grey-darkest">
                                                Linkend-learning
                                            </p>
                                            <p className="text-xs text-grey-darkest">
                                                12:45 pm
                                            </p>
                                        </div>
                                        <p className="text-grey-dark mt-1 text-sm">
                                            Get Andrés on this movie ASAP!
                                        </p>
                                    </div>
                                </div>
                                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                    <div>
                                        <img className="h-12 w-12 rounded-full"
                                            src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                                    </div>
                                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                        <div className="flex items-bottom justify-between">
                                            <p className="text-grey-darkest">
                                                Truong
                                            </p>
                                            <p className="text-xs text-grey-darkest">
                                                12:45 pm
                                            </p>
                                        </div>
                                        <p className="text-grey-dark mt-1 text-sm">
                                            Get Andrés on this movie ASAP!
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* Right  */}
                        <div className="w-2/3 border flex flex-col">

                            {/* Header  */}
                            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                <div className="flex items-center">
                                    <div>
                                        <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-grey-darkest">
                                            Linkend_learning
                                        </p>
                                        <p className="text-grey-darker text-xs mt-1">
                                            thungoc,dat,tai,truong,dung,thi
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                                    </div>
                                    <div className="ml-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                                    </div>
                                    <div className="ml-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-auto br-cl-1">
                                <div className="py-2 px-3">

                                    <div className="flex justify-center mb-2">
                                        <div className="rounded py-2 px-4 br-cl-2">
                                            <p className="text-sm uppercase">

                                                February 20, 2023
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-2">
                                        <div className="rounded py-2 px-3 br-cl-4">
                                            <p className="text-sm text-teal text-blue-500">
                                                ThuNgoc
                                            </p>
                                            <p className="text-sm mt-1">
                                                hello he so ly ly
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                12:45 pm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-2">
                                        <div className="rounded py-2 px-3 br-cl-4">
                                            <p className="text-sm text-purple text-blue-500">
                                                Tai
                                            </p>
                                            <p className="text-sm mt-1">
                                                web mừi đỉm
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                12:45 pm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-2">
                                        <div className="rounded py-2 px-3 br-cl-4">
                                            <p className="text-sm text-orange text-blue-500">
                                                Dat
                                            </p>
                                            <p className="text-sm mt-1">
                                                Ngonn
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                12:45 pm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-2">
                                        <div className="rounded py-2 px-3 br-cl-4">
                                            <p className="text-sm text-orange text-blue-500">
                                                Dung
                                            </p>
                                            <p className="text-sm mt-1">
                                                lạnh wa
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                12:45 pm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-2">
                                        <div className="rounded py-2 px-3 br-cl-4">
                                            <p className="text-sm text-teal text-blue-500">
                                                Thi
                                            </p>
                                            <p className="text-sm mt-1">
                                                hoho
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                12:45 pm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mb-2">
                                        <div className="rounded py-2 px-3 br-cl-5">
                                            <p className="text-sm mt-1">
                                                hummmm
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                okkk
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mb-2">
                                        <div className="rounded py-2 px-3 br-cl-5">
                                            <p className="text-sm mt-1">
                                                sonnn
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                okk
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex mb-2">
                                        <div className="rounded py-2 px-3 br-cl-4">
                                            <p className="text-sm text-purple text-blue-500">
                                                Tom Cruise
                                            </p>
                                            <p className="text-sm mt-1">
                                                Get Andrés on this movie ASAP!
                                            </p>
                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                12:45 pm
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-grey-lighter px-4 py-4 flex items-center">
                                <div>
                                <SmileOutlined />
                                </div>
                                <div className="flex-1 mx-4">
                                    <input className="w-full border rounded px-2 py-2" type="text" />
                                </div>
                                <div>
                                    <SendOutlined />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Chats