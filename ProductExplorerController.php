<?php if(!defined('CMS_ROOT')) die;

class ProductExplorerController extends PluginController
{
    public function upload()
    {
        if (empty($_FILES['file'])) {
            http_response_code(400);
            die(
                json_encode([
                    'message' => 'Form field `file` is required.',
                ])
            );
        }
        $uploads_dir = PUBLIC_ROOT . DIRECTORY_SEPARATOR . 'product_explorer';
        if (!is_dir($uploads_dir)) {
            mkdir($uploads_dir);
        }
        $file = $_FILES['file'];
        $fileName = $file['name'];
        $fileInfo = pathinfo($fileName);
        $newFileName =  time() . '_' . preg_replace('/\W/', '', $fileInfo['filename']) . '.' . preg_replace('/\W/', '', $fileInfo['extension']);
        if (move_uploaded_file($file['tmp_name'], $uploads_dir . DIRECTORY_SEPARATOR . $newFileName)) {
            http_response_code(200);
            die(
                json_encode([
                    'message' => 'Image is successfully uploaded.',
                    'imageUrl' => '/' . PUBLIC_DIR_NAME . '/product_explorer/' . $newFileName,
                ])
            );
        }
        http_response_code(400);
        die(
            json_encode([
                'message' => 'Can\'t move uploaded file.',
            ])
        );
    }
}
