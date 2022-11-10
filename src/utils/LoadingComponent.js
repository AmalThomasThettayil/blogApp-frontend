import React from 'react'
import { css } from '@emotion/react'
import RiseLoader from "react-spinners/ClipLoader";

//css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Loadingcomponent = () => {
    return (

        <RiseLoader color='red' loading={true} css={override} />
    )
}
export default Loadingcomponent;