
function formatTasksList(data) {
    data.forEach(task => {
        task.deadline = task.deadline.split("-").reverse().join("/");

        task.category = task.Category;
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