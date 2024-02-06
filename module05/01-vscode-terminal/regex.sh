# retrieves all file paths that end with .spec.js, ignoring node modules
find . -name "*.spec.js" -not -path "*node_modules**"  

# npm i -g ipt

# Select one of previous matches
find . -name "*.spec.js" -not -path "*node_modules**" | ipt

# Select one or more files, and add "use strict"; to them
CONTENT='"use strict";'
find . -name "*.js" -not -path "*node_modules**" \
| ipt -o \
| xargs -I "{file}" sed -i "{file}" -e "1s/^/"$CONTENT"\n/"