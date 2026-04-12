<?php
session_start();
session_destroy();
header("Location: /mael/index.html");
exit();
?>