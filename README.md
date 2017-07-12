# js-embed
Easy JS library with all the tools you need to embed an EventSquare store in your website.

### Requirements

The subdomain of your EventSquare store.


### Example

Replace 'subdomain' with your subdomain to test. Put code right after the body opening tag.

``` javascript
<script>
    !function(e,v,n,t,s,q,r){if(e.esq)return;s = e.esq=function(){s.callMethod?
    s.callMethod.apply(s,arguments):s.queue.push(arguments)};s.queue=[];
    q=v.createElement('script');q.async=!0;q.src=t;r=v.getElementsByTagName(n)[0];
    r.parentNode.insertBefore(q,r)}(window,document,'script','https://s3-eu-west-1.amazonaws.com/eventsquare.plugins/embed/embed.min.js');
    esq('init','yoursubdomain');
</script>

<button onclick="esq('show')">Open store</button>
```