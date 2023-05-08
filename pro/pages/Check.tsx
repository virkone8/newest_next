import React from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const Check = () => {
  return (
    <div>
      <SnackbarProvider />
      <button
        onClick={() =>
          enqueueSnackbar("That was easy!", {
            autoHideDuration: 3000,
            variant: "success",
          })
        }
      >
        Show snackbar
      </button>
    </div>
  );
};

export default Check;
