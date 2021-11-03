@extends('layouts.app')

@section('content-header')
Fields
@endsection

@section('content-button')
<a href="{{route('settings.create')}}"class="btn  btn-primary"><i class="fas fa-plus"></i> New field</a>


@endsection

@section('content')
<!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Form Inputs  List</h3>
                <div class="card-tools">
                	<form action="{{url('/search_blogslist')}}" method="POST" class="listing form-common d-flex" name="form-common">
                  	@csrf
                	<div class="input-group input-group-sm mr-2" style="width: 150px;">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  
                 
                </div>
                  </div>
                  <div class="input-group input-group-sm" style="width: 200px;">

                    <input type="text" class="form-control float-right" placeholder="Keyword" id="search_keywords" name="search_keywords" style="height: 38px;">

                    <div class="input-group-append">
                      <input type="hidden" name="pageno" id="pageno" value="1">
                      <button type="submit" class="btn btn-default">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
            	</form>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <div id="list"></div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
@endsection

@section('custom-js-footer')
<script>
	$( document ).ready(function() {
	    $('input[type=radio][name=status]').change(function() {
		    $('.listing.form-common').submit();
		});
	});
</script>
@endsection