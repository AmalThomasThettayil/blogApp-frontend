import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { deletepostAction, fetchPostDetailsAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";
import DOMPurify from "dompurify";
import Loadingcomponent from "../../utils/LoadingComponent";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";

const PostDetails = (props) => {

  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch()
  const Navigate = useNavigate();
  //select post details from store
  const post = useSelector(state => state?.post)
  const { postDetails, loading, appErr, serverErr, isDeleted } = post;
  console.log(postDetails);
  //comment
  const comment = useSelector(state => state.comment)
  const { commentCreated, commentDeleted } = comment;

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id))
  }, [id, dispatch, commentCreated, commentDeleted])


  //get login user
  const user = useSelector(state => state?.users)
  const { userAuth } = user
  const isCreatedBy = postDetails?.user?._id === userAuth?._id;

  //redirect
  if (isDeleted) return Navigate("/posts")
  return (
    <>

      {loading ?
        (<div className="h-screen">
          <Loadingcomponent />
        </div>)
        :
        appErr || serverErr ?
          (<h1 className="h-screen text-red-400 text-xl">{serverErr} {appErr}</h1>) :
          (<section
            className="py-20 2xl:py-40 bg-white overflow-hidden"
          >
            <div
              className=" px-4 mx-auto"
            >
              {/* Post Image */}
              <div
                className="flex justify-center"
              >
                <img
                  className="mb-10 w-auto h-25 object-fit"
                  src={postDetails?.image}
                  alt="img"
                />
              </div>
              <div
                className=" mx-auto text-center"
              >
                <h2 className="mb-14 text-6xl 2xl:text-7xl text-black font-bold font-heading">
                  {postDetails?.title}
                </h2>

                {/* User */}
                <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                  <img
                    className="mr-8 w-auto lg:w-auto h-20 lg:h-24 rounded-full"
                    src={postDetails?.user?.profilePhoto}
                    alt=""
                  />
                  <div className="text-left">
                    <h4 className="mb-1 text-2xl font-bold text-gray-50">
                      <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                        {postDetails?.user?.firstName}{" "}{postDetails?.user?.lastName}
                      </span>
                    </h4>
                    <p className="text-gray-500">
                      <DateFormatter date={postDetails?.createdAt} />

                    </p>
                  </div>
                </div>
                {/* Post description */}
                <div className="max-w-6xl mx-auto">
                  <p className="mb-6 text-justify  text-xl text-black-200">
                    <div className="text-black-300" dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        postDetails?.description),
                    }}></div>
                    {/* Show delete and update btn if created user */}
                    {isCreatedBy ? (
                      <p className="flex">
                        <Link to={`/update-post/${postDetails?._id}`} className="p-3">
                          <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                        </Link>
                        <button
                          onClick={() => dispatch(deletepostAction(postDetails?._id))}
                          className="ml-3">
                          <TrashIcon className="h-8 mt-3 text-red-600" />
                        </button>
                      </p>
                    ) : null}

                  </p>
                </div>
              </div>
            </div>
            {/* Add comment Form component here */}
            {userAuth ? (<AddComment postId={id} />) : null}

            <div className="flex justify-center  items-center">
              {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
              <CommentsList comments={postDetails?.comments} />
            </div>
          </section>)
      }


    </>
  );
};

export default PostDetails;
