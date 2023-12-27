const express = require('express');
const router = express.Router();
const checklogin = require('../../middleware/checklogin');
const assign = require("../../models/assigntask");

router.get('/task', checklogin, async (req, res) => {
        try {
            const userId = req.user.user.id;

            // Find all assigns with the specified user_id and sort by the 'from' field in ascending order
            const assigns = await assign.find({ user_id: userId }).sort({ from: 1 });
            console.log(assigns);

            res.status(200).json({
                status_code: 200,
                message: 'assign history retrieved successfully',
                data: assigns
            });
        } catch (error) {
            console.error('Error retrieving assign history:', error);
            res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
});

router.delete("/task/delete",checklogin,async(req, res)=>{
    if(req.user.admin==="yes"){
        try {
            
            const delete_task = req.header('delete_task_id');
            console.log(delete_task)
            if (!delete_task) {
                return res.status(404).send("not found")
            }
            if (delete_task.user_id.toString() !== req.user.user.id) {
                return res.status(401).send("not allowed")
            }
            deleted = await assign.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status_code: 200,
                message: 'assign task deleted sucessfully',
                data:deleted
            });
        } catch (error) {
            console.error('Error while cancelling assigned task', error);
            res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });
        }
    }
    else{
        res.status(401).json({
            status_code: 401,
            message: 'you are not allowed ',
            data: ''
    })

    }
});

router.put("/task/update",checklogin,async(req,res)=>{
    if(req.user.admin==="yes"){
        try{
            const delete_task = req.header('delete_task_id');
            console.log(update)
            const{taskname,priority,startdate,deadline,assignby,assignto,description,status}=req.body;
            const updatingtask={}
            if(taskname){updatingtask.taskname=taskname};
            if(priority){updatingtask.priority=priority};
            if(startdate){updatingtask.startdate=startdate};
            if(deadline){updatingtask.deadline=deadline};
            if(assignby){updatingtask.assignby=assignby};
            if(assignto){updatingtask.assignto=assignto};
            if(description){updatingtask.description=description};
            if(status){updatingtask.status=status};
            if (!update) {
                return res.status(404).send("not found")
            }
            if (update.user_id.toString() !== req.user.user.id) {
                return res.status(401).send("not allowed")
            }
            let updated = await assign.findByIdAndUpdate(req.params.id, { $set: updatingtask }, { new: true })
            res.status(200).json({
                status_code: 200,
                message: 'task updated successfully',
                data: updated
            });
        }
        catch(error){
            console.error('Error while updating task', error);
            res.status(500).json({
                status_code: 500,
                message: 'Internal server error',
                data: ''
            });

        }
    }
})
module.exports = router;
