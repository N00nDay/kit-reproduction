# clone repo
```
git clone https://github.com/N00nDay/kit-reproduction.git
```

# install dependencies
```
npm install
```

As it sits the project is set up as the documents suggest utilizing `applyAction` to update the `form` variable. 

I have a workaround that is getting me by on line 27 of `+layout.svelte`. Just uncomment the line and it will work with the additional typescript error.
```
18 <form
19   class="space-y-6"
20   method="POST"
21   action="/registration"
22   use:enhance={() => {
23     return async ({ result, update }) => {
24       if (result.type === "success") {
25         update();
26       } else if (result.type === "invalid") {
27         // form = result.data;
28         await applyAction(result);
29       } else {
30         await applyAction(result);
31       }
32     };
33   }}
34 >
```
