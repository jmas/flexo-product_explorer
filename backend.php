<?php

Plugin::addJavascript('product_explorer', 'build/bundle.js');
Filter::add('product_explorer', 'product_explorer/filter_product_explorer.php');
Plugin::addController('product_explorer', 'product_explorer', array('editor','developer','administrator'));
