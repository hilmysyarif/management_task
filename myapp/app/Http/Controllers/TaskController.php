<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index()
    {
        $task = Task::with('employee')->paginate(3);

        // Return Json Response
        return response()->json([
            'results' => $task
        ], 200);
    }

    public function show($id)
    {
        $task = Task::with('employee')->find($id);
        if (!$task) {
            return response()->json([
                'message' => 'Task Not Found.'
            ], 404);
        }

        // Return Json Response
        return response()->json([
            'results' => $task
        ], 200);
    }

    public function save(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'task_name' => 'required|string|max:255',
            'employee_id' => 'required|string',
            'due_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $task = Task::create([
            'task_name' => $request->task_name,
            'employee_id' => $request->employee_id,
            'due_date' => $request->due_date
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Task created successfully',
            'data' => $task
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'task_name' => 'required|string|max:255',
            'employee_id' => 'required',
            'due_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Task updated successfully',
            'data' => $task
        ], 200);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json([
            'status' => true,
            'message' => 'Task deleted successfully'
        ], 204);
    }
}
