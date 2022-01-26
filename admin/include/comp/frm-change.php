
  

<div class="container w-75 mx-auto ">

    <form class="row g-3 mt-5 alpha " method="GET">

    <h1 class=" text-center ">تعديل المستخدمين </h1>
  


        <div class="col-12 fs-5 ">
            <input type="text" class="form-control d-none" id="inputAddress" value="<?php echo $_SESSION['usID']; ?> " id="usID" name="usID">
        </div>
        <div class="row fs-5 mb-3">
            <label for="usName" class="form-label col-sm-2">User Name</label>
            <div class="col-sm-10"> <input type="text" class="form-control " id="inputAddress" value="<?php echo $_SESSION['usName']; ?>" id="usName" name="usName"></div>
        </div>
        <div class="row fs-5 mb-3">
            <label for="pw" class="form-label col-sm-2">Password</label>
            <div class="col-sm-10"> <input type="password" class="form-control" id="inputPassword4" id="pw" name="pw">
            </div>
        </div>
        <div class="row fs-5 mb-3">
            <label for="pw2" class="form-label col-sm-2">Re Password</label>
            <div class="col-sm-10"> <input type="password" class="form-control" id="inputPassword4" id="pw2" name="pw2">
            </div>
        </div>

        <div class="col-12 mb-3">
            <button type="submit" class="btn btn-primary fs-6">Save</button>
        </div>
    </form>

</div>