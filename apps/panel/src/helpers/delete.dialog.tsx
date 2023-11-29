import Swal from "sweetalert2";

export const deleteDialog = async (message: string, confirmButton?: string, finalMessage?: string) => {
    const fire = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButton || 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    });

    if (!fire.isConfirmed) {
        throw new Error('User cancelled the dialog');
    }

    return () => {
        Swal.fire(
          finalMessage || 'Deleted!',
            'success'
        )
    }
}
