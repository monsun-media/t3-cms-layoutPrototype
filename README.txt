/*************************************************************************/
How to proceed after your export
/*************************************************************************/
You can install all dependencies at once using:
-> install_depencies.sh

Or run the tasks individually:
1) Run composer to install all php dependencies: composer update
2) Run this to install ruby gems with bundler:  bundle install
3) Install npm modules: npm update
4) Install bower components: bower update

/*************************************************************************/
Adding components
/*************************************************************************/
-PHP: 
Try to find a suitable composer package and install it with require.
Using require will update the composer.json automatically:
-> composer require symfony/symfony

-Bower and npm:
Always use the --save option so the bower.json gets updated:
-> bower install jquery --save
-> npm install grunt-contrib-uglify --save

-Gems:
Install gems only via bundler by first updating the Gemfile, and then
executing the install command again:
-> bundle install

/*************************************************************************/
How to compile if you are working on the layout
/*************************************************************************/
