# drople
DropleJS is an easy-to-use Javascript open source library that provides drag'n'drop file uploads with image previews.
Without stress you can use drople with just a single line of code.

# usage
<ol>
<li>Include drople.js</li>

```html
<script src="path/to/drople.js"></script>
```

<li>The single line</li>

```html
<div id="drople" d-url="www.server-upload-url.com" d-mode="single"></div>
```
| Attribute      | Description                                                        |
| :---           | :---                                                               |
| d-url          | This is the server-side file upload URL. It is required            |
| d-mode         | This specifies the file upload type. It can either be 'single' for | 
|                | single file uploads, or 'multiple' for multiple file uploads.      |
</ol>


There you have it, simply painless.
