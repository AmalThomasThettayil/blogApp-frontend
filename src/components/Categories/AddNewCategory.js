import { PlusCircleIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../redux/slices/category/categorySlice";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

//Form schema
const formSchema = Yup.object({
    title: Yup.string().required("Category is required"),
});

const AddNewCategory = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    //formik
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        onSubmit: values => {
            //dispath the action
            dispatch(createCategoryAction(values))
            console.log(values);
        },
        validationSchema: formSchema,
    });

    //get data from store
    const state = useSelector(state => state?.category)
    const { loading, appErr, serverErr, isCreated } = state;
    // Navigate
    if (isCreated) return Navigate("/category-list")


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    {/* Logo */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="mx-auto w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652
                     2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0
                      0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-black-900">
                        Add New Category
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        <p className="font-medium text-black-600 hover:text-black-500">
                            These are the categories user will select when creating a post
                        </p>
                        {/*Display err */}
                        <div>
                            {appErr || serverErr ?
                                (<h2
                                    className="text-red-600 text-center text-lg"
                                >{serverErr}:{appErr}</h2>) : null}
                        </div>
                    </p>
                </div>
                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Name
                            </label>
                            {/* Title */}
                            <input
                                value={formik.values.title}
                                onChange={formik.handleChange("title")}
                                onBlur={formik.handleBlur("title")}
                                type="text"
                                autoComplete="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                                placeholder="New Category"
                            />
                            <div className="text-red-400 mb-2">
                                {formik.touched.title && formik.errors.title}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            {/* Submit */}
                            {loading ? (<button
                                disabled
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-grey-600 "
                            >

                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <PlusCircleIcon
                                        className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Loading please wait...
                            </button>) : (<button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <PlusCircleIcon
                                        className="h-5 w-5 text-green-700 group-hover:text-yellow-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Add new Category
                            </button>)
                            }

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewCategory;
