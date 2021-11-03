<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="{{ asset('img/logo1.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light"></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
     

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview">
            <a href="/" class="nav-link @if(Route::current()->uri === '/') active @endif">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                
              </p>
            </a>
            
          </li>

          <li class="nav-item">
                <a href="{{ url('/settings') }}" class="nav-link @if(strpos(Route::current()->uri, 'settings') === 0) active @endif">
                <i class="fas fa-tools"></i>
                  <p>
                    Settings
                  </p>
                </a>
              </li>
          <li class="nav-item">
                <a href="{{ url('/view-form') }}" class="nav-link @if(strpos(Route::current()->uri, 'view-form') === 0) active @endif">
                <i class="far fa-file-alt"></i>
                  <p>
                    View Form
                  </p>
                </a>
              </li>

          
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>