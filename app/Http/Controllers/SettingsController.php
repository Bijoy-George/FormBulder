<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormField;
use App\Models\FieldOptions;
use Auth;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth')->except('viewRegistrationForm');
    }
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

    public function addOptions()
    {
        $field_name_arr = formField::select('id','field_name')->where('field_type',3)->get();
        return view('settings.add_options',compact('field_name_arr'));
    }

    public function getAllOptions(Request $request)
    {
        if(request('field_id'))
      {
         $opt_arr = FieldOptions::select('id','options')->where('field_id',request('field_id'))->where('status',config('constant.ACTIVE'))->get();
        return view('settings.more_options',compact('opt_arr'));
      }
    }

    public function saveOptions(Request $request)
    {
        $option_arr=request('new_option');
        $flag=0;
        foreach($option_arr as $value)
        {
            if(!empty($value)){

            
                $op_count=FieldOptions::where('field_id',request('field_id'))->where('status',config('constant.ACTIVE'))->where('options',$value)->count();
                if($op_count == 0){
                   FieldOptions::updateOrCreate([
                            
                            'field_id'=>request('field_id'),
                            'options'=>$value,
                        ],[
                            'field_id'=>request('field_id'),
                            'options'=>$value,
                            'status'=>config('constant.ACTIVE')
                            
                        ]);
                 }else{
                  $flag=1;
                 }
                }
                    
        }
        if($flag == 1)  
          {
             $result_arr = array('success' => false, 'message' => 'Options Already Exist');
            echo json_encode($result_arr);

          }else{
           $result_arr=array('reset'=>true,'success' => true,'message' => 'Successfuly added');
           
            echo json_encode($result_arr);
          }
    }

    public function viewRegistrationForm()
    {
        $formInput = formField::with('getOptions')->orderBy('id','DESC')->get();
        return view('viewForm',compact('formInput'));
    }
}
