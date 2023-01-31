const QueryFile = () => {

  const exportUserInfo = (queryData: string[], name: string) => {
    const modifiedData = queryData?.join(';\n');
    const fileData = JSON.stringify(modifiedData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name}.sql`;
    link.href = url;
    link.click();
  }

  return (
    {
      exportUserInfo
    }
  )
}

export default QueryFile