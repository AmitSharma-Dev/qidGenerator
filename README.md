# qidgenerator README

* open the html file. 
* Ctrl + Shift + p, 
* then select 'Add QID To current file 🙈🙉🙊'.
* Enter the qid prefix i.e for qid="dashboard-1" enter 'dashboard'
* The extension will add qid to all anchors, button and input elements in opened html.

![Demo](https://gifyu.com/image/lROh)


** INPUT
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="http://" target="_blank" rel="noopener noreferrer"></a>
    <div *ngFor="let item of list">
        <a href="http://" target="_blank" rel="noopener noreferrer"></a>
    </div>
    <div *ngFor="let item of list; let i = index">
        <a href="http://" target="_blank" rel="noopener noreferrer"></a>
    </div>
</body>
</html>
```

OUTPUT
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="http://" target="_blank" rel="noopener noreferrer" qid="dashboard-0"></a>
    <div *ngFor="let item of list;let qidIndex = index;">
        <a href="http://" target="_blank" rel="noopener noreferrer" qid="dashboard-1-qidIndex"></a>
    </div>
    <div *ngFor="let item of list; let i = index">
        <a href="http://" target="_blank" rel="noopener noreferrer" qid="dashboard-2-i"></a>
    </div>
</body>
</html>
```