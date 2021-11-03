@extends('layouts.app')

@section('content')
<div class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
              	@if (isset($formField))
              		<h3 class="card-title">Edit Input</h3>
              	@else
                	<h3 class="card-title">Create Input</h3>
                @endif

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 100px;">
                    <a href="{{ url('settings') }}" class="btn btn-block btn-default"><i class="fas fa-chevron-left"></i> Back</a>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              	<div id="msg" class="p-2"></div>
              	@if(isset($formField))
					{!! Form::model($formField, ['method' => 'POST', 'class' => 'form-upload', 'route' => ['settings.store']]) !!}
				@else
					{!! Form::open(array('route' => 'settings.store', 'class' => 'form-upload', 'method'=>'POST')) !!}
				@endif
				{{ Form::hidden('id') }}
        <input type="hidden" class="callback" value="form_basic_redirect">
          <input type="hidden" class="arg" value="1">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Input Label</label>
                      {{ Form::text('label', null, array('class' => 'form-control', 'placeholder' => 'Enter Label Name')) }}
                      <span class="error" id ="label_err"></span>
                    </div>
                  </div> 
                  <?php $field_type = config('constant.Field_type');?>
                  <div class="col-md-4">
                   <div class="form-group">
                      <label for="exampleInputEmail1">Field Type</label>
                      {{ Form::select('field_type', $field_type, null, array('class' => 'form-control', 'id' => 'field_type', 'placeholder' => 'Select Type')) }}
                      <span class="error" id ="field_type_err"></span>
                    </div>
                    @if(isset($formField) && $formField->field_type == 3)
                    <div class="form-group" id="options">
                    <a  target="_blank" href="{{ url('add-field-options') }}" class="btn btn-block btn-default"><i class="fas fa-plus"></i> Add options</a>

                    </div>
                    @endif
                  </div>

                   
                  
                
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              <!-- /.card-body -->
              {!! Form::close() !!}
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </div>
@endsection