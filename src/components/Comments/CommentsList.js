import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsList({ comments }) {
  const user = useSelector(state => state.users)
  const { userAuth } = user
  const isLoginUser = userAuth?._id
  console.log(isLoginUser);
  //dispatch
  const dispatch = useDispatch();
  return (
    <div>
      <ul className="divide-y bg-gray-300 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-black">Comments{" ("}{comments?.length}{")"}</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-yellow-600 text-lg text-center">No comments</h1>
          ) : (
            comments?.map(comment => (
              <>
                <li
                  key={comment?._id}
                  className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-black">
                          {comment?.user?.firstName} {comment?.user?.lastName}
                        </h3>
                        <p className="text-bold text-black text-base ml-5">
                          {/* <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment> */}

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      <p className="text-sm text-black">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}
                      {isLoginUser === comment?.user?._id ?
                        (
                          <p class="flex">
                            <Link
                              to={`/update-comment/${comment?._id}`}
                              class="p-3">
                              <PencilAltIcon class="h-5 mt-3 text-yellow-600" />
                            </Link>
                            <button
                              onClick={() => dispatch(deleteCommentAction(comment?._id))}
                              class="ml-3">
                              <TrashIcon class="h-5 mt-3 text-red-600" />
                            </button>
                          </p>
                        ) :
                        null}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}
