import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUp } from '../authSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = data => {
        dispatch(signUp(data));
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)} >
            <h2>Đăng nhập</h2>
            <div className="mb-3">
                <label htmlFor="">Username</label>
                <input type="text" {...register('username')} />
            </div>
            <div className="mb-3">
                <label htmlFor="">Email</label>
                <input type="email" {...register('email')} />
            </div>
            <div className="mb-3">
                <label htmlFor="">Password</label>
                <input type="password" {...register('password')} />
            </div>
            <div>
                <button className="btn btn-primary" disabled={isSubmitting}>Đăng ký</button>
            </div>
        </form>
    )
}

export default SignUp
