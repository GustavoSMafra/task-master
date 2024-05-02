
function formatTasksList(data) {
    data.forEach(task => {
        task.deadline = task.deadline.split("-").reverse().join("/");

        task.category = task.Category;
        if(!task.category) {
            const categoryDefault =  {
                name: "",
                color: "#7f7f7f",
                icon: "bi bi-list-task"
            }
            task.category = categoryDefault;
        }
        delete task.Category;
    
        task.checklists = task.Checklists;
        delete task.Checklists;
    
        task.totalChecklists = task.checklists.length;
        task.doneChecklists = task.checklists.filter(checklist => checklist.done).length;
    });

    return data;
}

module.exports = {
    formatTasksList,
};