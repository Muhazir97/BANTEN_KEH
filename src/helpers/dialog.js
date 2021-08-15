import swal from 'sweetalert2';

const dialog = {
    alertDialog(type, message) {
        let icon = 'info';
        let title = 'Info';
                
        switch(type) {
            case 'error':
                icon = 'error';
                title = 'Error';
                break;
            case 'success':
                icon = 'success';
                title = 'Success';
                break;
            default:
                icon = 'info';
                title = 'Info';
                break;
        }
        return swal.fire({
            icon: icon,
            title: title,
            text: message
        });
    },
    confirmDialog(message) {
        return swal.fire({
            title: 'Confirmation',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5e72e4',
            cancelButtonColor: '#f5365c',
            confirmButtonText: 'Yes'
        })
    }  
}
export default dialog