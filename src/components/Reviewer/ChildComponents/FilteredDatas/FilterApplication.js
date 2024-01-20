const filterApplication = (moment, allInfo) => {
    if (
        moment(allInfo.searchFromDate).isAfter(allInfo.searchUpToDate)
      ) {
        allInfo.message.showErrorFlash = true;
        setTimeout(() => {
            allInfo.message.showErrorFlash = false;
        }, 4000);
      } else if (
        allInfo.searchFromDate !== "" &&
        allInfo.searchUpToDate !== "" &&
        allInfo.app_type != ""
      ) {
        searchByInput(
          allInfo.searchFromDate,
          allInfo.searchUpToDate,
          allInfo.app_type,
          allInfo,
          moment
        );
      } else if (allInfo.app_type != "") {
          
        searchByInput(
          "notSearched",
          "notSearched",
          allInfo.app_type,
          allInfo,
          moment
        );
      } else if (
        allInfo.searchFromDate != "" &&
        allInfo.searchUpToDate != ""
      ) {
        searchByInput(
            allInfo.searchFromDate,
            allInfo.searchUpToDate,
          "notSearched",
          allInfo,
          moment
        );
      }
}

const searchByInput = (startingFrom, upTo, app_type, allInfo, moment) => {
    allInfo.searchByInput = true;
    for (let applicant in allInfo.assignApplication) {
      if (
        startingFrom != "notSearched" &&
        app_type != "notSearched"
      ) {
        if (
          !moment(startingFrom).isAfter(
            allInfo.assignApplication[applicant].createdAt
          ) &&
          moment(upTo).isSameOrAfter(
            allInfo.assignApplication[applicant].createdAt
          ) &&
          allInfo.assignApplication[applicant].applicationType ==
            app_type
        ) {
          if (!allInfo.alreadyPushed) {
            allInfo.filteredByDate.push(
                allInfo.assignApplication[applicant]
            );
          }
        }
      }  else if (app_type != "notSearched") {
        if (
            allInfo.assignApplication[applicant].applicationType ==
          app_type
        ) {
          if (!allInfo.alreadyPushed) {
            allInfo.filteredByDate.push(
                allInfo.assignApplication[applicant]
            );
          }
        }
      } else if (startingFrom != "notSearched") {
        if (
          !moment(startingFrom).isAfter(
            allInfo.assignApplication[applicant].createdAt
          ) &&
          moment(upTo).isSameOrAfter(
            allInfo.assignApplication[applicant].createdAt
          )
        ) {
          if (!allInfo.alreadyPushed) {
            allInfo.filteredByDate.push(
                allInfo.assignApplication[applicant]
            );
          }
        }
      }
    }
    allInfo.alreadyPushed = true;
  };

export default filterApplication;