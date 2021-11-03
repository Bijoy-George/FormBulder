<table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Label</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    @if(count($results) > 0)
                    @foreach ($results as $data)
                    <tr>
                      <td>{{ $data->id }}</td>
                      <td>{{ $data->label }}</td>
                      <td>{{ $data->field_name }}</td>
                      <td>{{ config('constant.Field_type')[$data->field_type ?? ''] }}</td>
                      <td class="text-right"><div class="btn-group">
                        <!-- <button type="button" class="btn btn-default"><i class="far fa-eye"></i></button> -->
                        <a href="{{ url('settings/'.$data->id.'/edit') }}" class="btn btn-default"><i class="fas fa-pencil-alt"></i></a>
                              <a href="javascript:void(0)" onclick="deletePop('settings/' + {{ $data->id }})" class="btn btn-default"> <i class="far fa-trash-alt"></i></a>
        
                      </div></td>
                    </tr>
                    @endforeach
                    @else
                    <tr>
                      <td colspan="6" class="text-center">No data found</td>
                    </tr>
                    @endif
                    
                    
                  </tbody>
                </table>
                <div class="d-flex justify-content-end first">{{ $results->render() }}</div>