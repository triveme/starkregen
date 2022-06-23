import { useState } from "react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useStateContext } from "../providers/state-provider";
import { snackActions } from "../utils/snack-bar-utils";

export function LoadingButton(props) {
  const { stateContext, setStateContext } = useStateContext();
  const [loading, setLoading] = useState(false);
  const { queryFun, queryCompleteFun, queryText, queryColor, style, type, size, fullWidth } = props;

  const handleQueryComplete = (res) => {
    if (queryCompleteFun) {
      queryCompleteFun(res);
      return;
    }

    setStateContext({
      ...stateContext,
      queryTrigger: stateContext.queryTrigger + 1,
    });
  };

  const handleQueryFun = (e) => {
    setLoading(true);
    queryFun(e)
      .then((res) => {
        setLoading(false);
        handleQueryComplete(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          snackActions.error(err.response.data.message);
          console.log(err.response.data.message);
          return;
        }

        snackActions.error(err.toString());
      });
  };

  return (
    <MuiLoadingButton
      loading={loading}
      onClick={handleQueryFun}
      sx={style ? style : null}
      type={type ? type : "button"}
      size={size ? size : "medium"}
      fullWidth={fullWidth ? fullWidth : false}
      variant="contained"
      color={queryColor ? queryColor : "primary"}
    >
      <Typography variant="button" component="div">
        {queryText}
      </Typography>
    </MuiLoadingButton>
  );
}

export function LoadingAndCancelButtons(props) {
  const { stateContext, setStateContext } = useStateContext();
  const [loading, setLoading] = useState(false);
  const { queryFun, cancelFun, queryCompleteFun, queryText, cancelText, queryColor, style } = props;

  const handleQueryComplete = (res) => {
    if (queryCompleteFun) {
      queryCompleteFun(res);
      return;
    }

    setStateContext({
      ...stateContext,
      queryTrigger: stateContext.queryTrigger + 1,
    });
  };

  const handleCancelFun = () => {
    cancelFun();
  };

  const handleQueryFun = (e) => {
    setLoading(true);
    queryFun(e)
      .then((res) => {
        setLoading(false);
        handleQueryComplete(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response) {
          snackActions.error(err.response.data.message);
          console.log(err.response.data.message);
          return;
        }

        snackActions.error(err.toString());
      });
  };

  return (
    <>
      <MuiLoadingButton
        variant="contained"
        color={queryColor ? queryColor : "primary"}
        loading={loading}
        onClick={handleQueryFun}
        sx={style ? style : null}
      >
        <Typography variant="button" component="div">
          {queryText}
        </Typography>
      </MuiLoadingButton>
      <Button disabled={loading} onClick={handleCancelFun} sx={style ? style : null} color="secondary">
        <Typography variant="button" component="div" color="secondary">
          {cancelText}
        </Typography>
      </Button>
    </>
  );
}
