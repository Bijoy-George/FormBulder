<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}" />

  <title>FormBuilder</title>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css') }}">
  <!-- IonIcons -->
  <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('css/adminlte.min.css') }}">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body class="hold-transition sidebar-mini">
<div class="wrapper">
  <!-- Navbar -->
  @include('layouts.navigation')
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  @include('layouts.sidebar')

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">@yield('content-header') </h1>
          </div><!-- /.col -->
          <div class="col-sm-6 text-right">
            @yield('content-button')            
          </div>
          
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>

    <!-- /.content-header -->

    <!-- Main content -->
    @yield('content')
<!-- Deletion modal start -->
    <div class="modal fade" id="deleteRecord" role="dialog" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
  <form role="form" method="delete" class="form-common" name="deletionFrom" action="#">
    <!-- @method('DELETE') -->
    @csrf
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="message"></div>
          <p id="delete_msg">Are you sure want to Delete ?</p> 
          
        </div>
        <div class="modal-footer">
          <input type="hidden" name="id" id="id" value="">
          <input type="hidden" class="callback-path" id="callback-path" value="">
          <input type="hidden" class="" id="from_create" value="">
          <input type="hidden" name="pageno" id="pageno" value="">
          <input type="hidden" name="callback" class="callback" value="form_basic_reload" />
          <!--<input type="hidden" name="" id="pageid" value="">-->
          <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
          <button type="submit" class="btn btn-primary" id="s1">Yes</button>
        </div>
      </div>
    </div>
  </form>
</div>
<!-- Deletion modal end --> 
<!-- Activation modal start -->
    <div class="modal fade" id="activateRecord" role="dialog" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
  <form role="form" method="POST" class="form-common" name="activateFrom" action="#">
    @csrf
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="message"></div>
          <p id="delete_msg">Are you sure want to activate ?</p> 
          
        </div>
        <div class="modal-footer">
          <input type="hidden" name="id" id="id" value="">
          <input type="hidden" class="callback-path" id="callback-path" value="">
          <input type="hidden" class="" id="from_create" value="">
          <input type="hidden" name="pageno" id="pageno" value="">
          <input type="hidden" name="callback" class="callback" value="form_basic_reload" />
          <!--<input type="hidden" name="" id="pageid" value="">-->
          <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
          <button type="submit" class="btn btn-primary" id="s1">Yes</button>
        </div>
      </div>
    </div>
  </form>
</div>
<input type="hidden" name="base_url" id="base_url" value="{{url('/')}}">

<!-- Activation modal end -->
<!-- Image Modal -->
<div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img id="image-container" src="#" style="max-width: 100%" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->

  <!-- Main Footer -->
  @include('layouts.footer')
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->

<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- AdminLTE -->
<script src="{{ asset('js/adminlte.js') }}"></script>
<script src="https://cdn.tiny.cloud/1/7qw8e3jtis79nkjopxtufzt9r6sou2krbl5l3cy68od31j37/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
<!-- OPTIONAL SCRIPTS -->
<script src="{{ asset('plugins/chart.js/Chart.min.js') }}"></script>
<script src="{{ asset('js/demo.js') }}"></script>
<script src="{{ asset('js/common.js') }}"></script>
<script src="{{ asset('js/pages/dashboard3.js') }}"></script>
@yield('custom-js-footer')
</body>
</html>
