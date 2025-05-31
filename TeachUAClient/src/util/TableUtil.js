export const editCellValue = async (form, data, id) => {
    const row = await form.validateFields();
    const newData = [...data];
    const index = newData.findIndex((item) => id === item.id);
    newData.splice(index, 1, {...newData[index], ...row});
    return {
        data: newData,
        item: newData[index]
    };
};

export const deleteFromTable = (data, id) => {
    const newData = [...data];
    const index = newData.findIndex((item) => id === item.id);
    newData.splice(index, 1);

    return newData;
};

export const addToTable = (currentData, addingData) => {
    return currentData.concat(addingData);
};