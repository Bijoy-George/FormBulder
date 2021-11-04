@extends('layouts.external')

@section('content')
<div class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
              		<h3 class="card-title">Registration Form</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              	<div id="msg" class="p-2"></div>

       
        <input type="hidden" class="callback" value="form_basic_redirect">
          <input type="hidden" class="arg" value="1">
          <div class="row">
          @if(count($formInput) > 0)
          @foreach($formInput as $value)
        @if($value->field_type ==1)
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputEmail1">{{$value->label}}</label>
                      {{ Form::text($value->field_name, null, array('class' => 'form-control')) }}
                    </div>
                  </div> 
          @elseif($value->field_type ==2) 
            <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputEmail1">{{$value->label}}</label>
                      {{ Form::number($value->field_name, null, array('class' => 'form-control')) }}
                    </div>
                </div>
                @elseif($value->field_type ==3)
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="exampleInputEmail1">{{$value->label}}</label>

        <select name="{{ $value->field_name?? '' }}" class="form-control">
        <option value="">Select</option>
       
        @foreach($value->getOptions as $op)
        <option class="{{$op->class ??''}}" value="{{$op->id}}">{{$op->options}}</option>
        @endforeach
        </select>
</div>
</div>
        @endif
        @endforeach
        </div>
                
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                @else
                <div class="card-footer">
                  No Inputs Found
</div>
                @endif

              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </div>
@endsection