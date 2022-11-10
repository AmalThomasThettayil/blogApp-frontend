import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchPostsAction,
    toggleAddLikesToPost,
    toggleAddDislikesToPost,
} from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import Loadingcomponent from "../../utils/LoadingComponent";
import * as DOMPurify from "dompurify";
//import { Navigate, useNavigate } from "react-router-dom";


export default function PostsList() {

    //select post from store
    const post = useSelector(state => state?.post)
    const { postLists, appErr, serverErr, likes, dislikes } = post;

    const user = useSelector((state) => state?.users);
    const { userAuth } = user;
    //const navigate = useNavigate();
    //select category from store
    const category = useSelector(state => state?.category)
    console.log(category);
    const {
        categoryList,
        loading: catLoading,
        appErr: catAppErr,
        serverErr: catServerErr,
    } = category;


    //dispatch
    const dispatch = useDispatch();
    //fetch post
    useEffect(() => {
        // if (userAuth) 

        dispatch(fetchPostsAction(""));

    }, [dispatch, likes, dislikes]);

    //fetch categories
    useEffect(() => {
        dispatch(fetchCategoriesAction());
    }, [dispatch]);


    return (
        <>
            <section>
                <div class="py-20 bg-black min-h-screen radius-for-skewed">
                    <div class="container mx-auto px-4">
                        <div class="mb-16 flex flex-wrap items-center">
                            <div class="w-full lg:w-1/2">
                                {/* <span class="text-green-600 font-bold">
                                    Latest Posts from our awesome authors
                                </span> */}
                                <h2 class="text-4xl text-yellow-300 lg:text-5xl font-bold font-heading">
                                    Latest Post
                                </h2>
                            </div>

                            <div class=" block text-right w-1/2">
                                {/* View All */}
                                <button
                                    onClick={() => dispatch(fetchPostsAction(""))}
                                    class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-yellow-400 hover:bg-yellow-900 text-black-50 font-bold leading-loose transition duration-200">
                                    View All Posts
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3">
                            <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                                <div class="py-4 px-6 bg-black-600 shadow rounded">
                                    <h4 class="mb-4 text-yellow-500 font-bold uppercase">
                                        Categories
                                    </h4>
                                    <ul>
                                        {catLoading ? (
                                            <Loadingcomponent />
                                        ) : catAppErr || catServerErr ? (
                                            <h1>
                                                {catServerErr} {catAppErr}
                                            </h1>
                                        ) : categoryList?.length <= 0 ? (
                                            <h1 className="text-yellow-400 text-xl text-center">No Category Found</h1>
                                        ) : (
                                            categoryList?.map(category => (
                                                <li>
                                                    <p onClick={() => dispatch(fetchPostsAction(category?.title))}
                                                        className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-900 hover:bg-yellow-900 font-bold leading-loose transition duration-200">
                                                        {category?.title}
                                                    </p>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div class="w-full lg:w-3/4 px-3">
                                {/* post goes here */}
                                {appErr || serverErr ? (<h1>{serverErr} {appErr}</h1>) :
                                    postLists?.length <= 0 ? (<h1 className="text-black-400 text-xl text-center">No Post found!</h1>) :
                                        (postLists?.map(post => (
                                            <div
                                                key={post.id}
                                                class="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6">
                                                <div class="mb-10  w-full lg:w-1/4 px-3">
                                                    <Link>
                                                        {/* Post image */}
                                                        <img
                                                            to={`/posts/${post?._id}`}
                                                            class="w-full h-full object-cover rounded"
                                                            src={post?.image}
                                                            alt=""
                                                        />
                                                    </Link>

                                                    {/* Likes, views dislikes */}
                                                    <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                                                        {/* Likes */}
                                                        <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                                                            {/* Togle like  */}

                                                            {post?.likes?.includes(userAuth?._id) ? (
                                                                <div className="">
                                                                    <ThumbUpIcon
                                                                        onClick={() =>
                                                                            dispatch(toggleAddLikesToPost(post?._id))
                                                                        }
                                                                        className="h-7 w-7 text-blue-600 cursor-pointer"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="">
                                                                    <ThumbUpIcon
                                                                        onClick={() =>
                                                                            dispatch(toggleAddLikesToPost(post?._id))
                                                                        }
                                                                        className="h-7 w-7 text-gray-400 cursor-pointer"
                                                                    />
                                                                </div>
                                                            )}


                                                            <div className="pl-2 text-gray-600"> {post?.likes?.length ? post?.likes?.length : 0}</div>
                                                        </div>

                                                        {/* Dislike */}
                                                        <div className="flex flex-row  justify-center items-center px-2   pt-2">
                                                            {post?.disLikes?.includes(userAuth?._id) ? (

                                                                <div>
                                                                    <ThumbDownIcon
                                                                        onClick={() =>
                                                                            dispatch(toggleAddDislikesToPost(post?._id))
                                                                        }
                                                                        className="h-7 w-7 cursor-pointer text-gray-900"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <ThumbDownIcon
                                                                        onClick={() =>
                                                                            dispatch(toggleAddDislikesToPost(post?._id))
                                                                        }
                                                                        className="h-7 w-7 cursor-pointer text-gray-400"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="pl-2 text-gray-900">
                                                                {post?.disLikes?.length
                                                                    ? post?.disLikes?.length
                                                                    : 0}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                                                            <div>
                                                                <EyeIcon className="h-7 w-7  text-gray-400" />
                                                            </div>
                                                            <div className="pl-2 text-gray-600">
                                                                {post?.numViews}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-full lg:w-3/4 px-3">
                                                    <Link
                                                        to={`/posts/${post?._id}`}
                                                        class="hover:underline">
                                                        <h3 class="mb-1 text-2xl text-green-400 font-bold font-heading">
                                                            {/* {capitalizeWord(post?.title)} */}  {post?.title}
                                                        </h3>
                                                    </Link>

                                                    <a
                                                        href={`/posts/${post?._id}`}
                                                        class="text-gray-300 hover:text-white" dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(
                                                                post.description.substr(0, 1000)
                                                            ),
                                                        }}></a>
                                                    {/* Read more */}
                                                    <Link
                                                        to={`/posts/${post?._id}`}
                                                        className="text-indigo-500 hover:underline">
                                                        Read More..
                                                    </Link>
                                                    {/* User Avatar */}
                                                    <div className="mt-6 flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <Link>
                                                                <img
                                                                    className="h-10 w-10 rounded-full"
                                                                    src={post?.user?.profilePhoto}
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                <Link className="text-yellow-400">
                                                                    {post?.user?.firstName} {post?.user?.lastName}
                                                                </Link>
                                                            </p>
                                                            <div className="flex space-x-1 text-sm text-green-500">
                                                                <time>
                                                                    <DateFormatter date={post?.createdAt} />
                                                                </time>
                                                                <span aria-hidden="true">&middot;</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        )
                                        )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900">
                    <div class="skew bg-green-500 skew-bottom mr-for-radius">
                        <svg
                            class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
                            viewBox="0 0 10 10"
                            preserveAspectRatio="none"
                        >
                            <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
                        </svg>
                    </div>
                    <div class="skew bg-gray-500  skew-bottom ml-for-radius">
                        <svg
                            class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
                            viewBox="0 0 10 10"
                            preserveAspectRatio="none"
                        >
                            <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
                        </svg>
                    </div>
                </div>
            </section>
        </>
    );
}
