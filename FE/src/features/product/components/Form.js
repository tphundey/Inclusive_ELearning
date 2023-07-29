import { useForm } from 'react-hook-form';
const ProductForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Name</label>
                <input type="text" className="form-control"  {...register('name')} />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Ảnh</label>
                <input type="text" className="form-control" {...register('image')} />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Giá</label>
                <input type="number" className="form-control" {...register('number')} />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Số lượng</label>
                <input type="number" className="form-control" {...register('number')} />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Mô tả</label>
                <textarea name="" id="" cols="30" rows="10" {...register('desc')}></textarea>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary">Thêm sản phẩm</button>
            </div>
        </form>
    )
}

export default ProductForm
