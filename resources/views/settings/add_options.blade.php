@extends('layouts.app')
@section('content')
<div class="content-area">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="text-right"><a href="{{url('settings')}}" class="btn btn-danger">Back</a> </div>
      <div class="widget mt-3">
        <h2 class="m-0">{{__('Add Field Options')}}</h2>
        <div class="widget-content p-3">
          {!! Form::open(array('route' => 'save_options', 'class' => 'form-upload', 'method'=>'POST')) !!}
            {{ csrf_field() }}
            @if(session('message'))
            <div class="alert alert-danger"> {{session('message')}}</div>
            @endif
            @if(session('success'))
            <div class="alert alert-success"> {{session('success')}}</div>
            @endif
            <div class="message"></div>
            <div class="form-group">
              <label for="title" class="control-label">{{__('Select Fileds')}}<span class="red_star">*</span></label>
              <select name="field_id" id="field_id" class="form-control" onchange="get_all_options()">
                <option value="">Select</option>
                @foreach($field_name_arr as $fields)
                <option value="{{$fields->id}}">{{$fields->field_name}}</option>
                @endforeach
              </select>
              <span class="error" id="field_name_arr"></span> 
            </div>
            <div class="form-group">
              <label for="title" class="control-label">{{__('New Options')}}<span class="red_star">*</span></label>
              <input type="text" name="new_option[]" value="" class="form-control">
              <span class="error" id="field_name_arr"></span> 
            </div>
            <div class="form-group" id="opt_div"></div>
            <input type="hidden" name="callback" id="" value="get_all_options" class="callback">
            <div class="clearfix"></div>
            <div id="final_result"></div>
            <div class="form-group text-right"><br>
              <button type="submit" class="btn btn-primary"> {{__('Save')}} </button>
            </div>
            
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
