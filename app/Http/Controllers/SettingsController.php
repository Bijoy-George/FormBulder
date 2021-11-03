<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormField;
use Auth;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('settings.index');

    }

    public function listInput(Request $request)
    {
        $results = FormField::paginate();
        $html = view('settings.list_view')->with(compact('results'))->render();
        $result_arr=array('success' => true,'html' => $html);
        return json_encode($result_arr);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('settings.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'label'      => 'required',
            'field_type'      => 'required'
        ]);
        $fieldName=str_replace(' ', '_', strtolower(request('label')));
        FormField::updateOrCreate([
            'id' => $request->id,
        ],
        [
            'field_name' => $fieldName,
            'label' => $request->label,
            'field_type' => $request->field_type,
            'status' => config('constant.ACTIVE'),
            'created_by' => Auth::user()->id
        ]);

            $result_arr=array('reset'=>true,'success' => true,'status' => 'success','message' => 'Saved successfully', 'redirect_url' => url('settings'));

            return $result_arr;


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $formField = FormField::find($id);
        return view('settings.create',compact('formField'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = formField::find($id);
        if($data)
        {
            $data->delete();
            $result_arr=array('success' => true,'message' => 'Deleted Successfully','refresh' =>true);

            return $result_arr;
        }
        
    }
}
