<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="../resources/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="../resources/bootstrap-table/dist/bootstrap-table.min.css" rel="stylesheet" />  
    <link href="../resources/bootstrap-table/dist/bootstrap-datetimepicker.min.css" rel="stylesheet" />  

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    
<div class="containe">  
    <table class="table table-striped table-bordered table-hover">  
        <thead>  
            <tr class="success">  
                <th>���</th>  
                <th style="display: none">ActionID</th>  
                <th>Category</th>  
                <th>SubProcess Name</th>  
                <th>Description</th>  
                <th>Do Action</th>  
            </tr>  
        </thead>  
        <tbody>  
            <?php  
                //�������ݹ����ı���$subprocess_info  
                $i=1;  
                foreach($subprocess_info as $_v){  
            ?>  
            <tr id="">  
                <td><?php echo $i; ?></td>  
                <td style="display: none"><?php echo $_v->ActionID; ?></td>  
                <td><?php echo $_v->Category; ?></td>  
                <td><a href="#"><?php echo $_v->ActionName; ?></a></td>  
                <td><?php echo $_v -> Description; ?></td>  
                <td>  
                    <a href="./datagrid.php?r=subprocess/update&id=<?php echo $_v->ActionID; ?>">�޸�</a>  
                    <a href="./datagrid.php?r=subprocess/del&id=<?php echo $_v->ActionID; ?>">ɾ��</a>  
                </td>  
            </tr>  
            <?php $i++; }?>  
        </tbody>  
    </table>  
</div>  

<div class="col-md-12">  
    <div style="float:right;margin:10px 0px 10px 5px">  
        <a title="Add" href="./datagrid.php?r=subprocess/add">  
            <button type="button" class="btn btn-default" id="addData"<span style="color:#008000;background-color:#efefef;font-weight:bold;"></span>>  
                <span class="glyphicon glyphicon-plus"></span>  
            </button>  
        </a>  
    </div>  
    <table class="table table-striped table-bordered table-hover" id="subprocessTable"></table>  
</div>  

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="../resources/bootstrap-3.3.7-dist/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
    <!--表格编辑-->  
	<script src="../resources/bootstrap-table/dist/bootstrap-table.js"></script>  
	<script src="../resources/bootstrap-table/dist/bootstrap-table-edit.js"></script>  
	<script src="../resources/bootstrap-table/dist/bootstrap-select.js"></script>  
	<script src="../resources/bootstrap-table/dist/bootstrap-datetimepicker.min.js"></script>  
	
	<script src="subprocess.js"></script>  

  </body>
</html>