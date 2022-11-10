import React from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchCommentAction,
  updateCommentAction
} from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const UpdateComment = (props) => {
  const { id } = useParams();
  console.log(id);
  //dispatch
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //fetch comment
  useEffect(() => {
    dispatch(fetchCommentAction(id))
  }, [dispatch, id]);

  //select comment from store
  const comment = useSelector(state => state?.comment)
  const { commentDetails, isUpdated } = comment;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: values => {
      const data = {
        id,
        description: values?.description,
      };
      console.log(data);
      //dispatch action
      dispatch(updateCommentAction(data))
    },
    validationSchema: formSchema,
  });
  //redirect
  if (isUpdated) return Navigate(`/posts`)
  return (
    <div className="height-96 flex justify-center items-center">


      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="mt-5 flex max-w-sm m-auto"
        >
          <input
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            type="text"
            name="text"
            id="text"
            className="shadow-sm focus:ring-indigo-500  mr-2
             focus:border-indigo-500 block w-full p-2 border-3
              sm:text-sm border-gray-300 rounded-md"
            placeholder="Add New comment"
          />

          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <div className="text-red-400 mb-2 mt-2">
          {formik.touched.description && formik.errors.description}
        </div>
      </div>
    </div>
  );
};

export default UpdateComment;
