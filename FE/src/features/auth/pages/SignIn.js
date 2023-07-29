import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn } from '../authSlice';

const SignIn = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = data => {
        dispatch(signIn(data));
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)} >
            <h2>Đăng nhập</h2>
            <div className="mb-3">
                <label htmlFor="">Email</label>
                <input type="email" {...register('email')} />
            </div>
            <div className="mb-3">
                <label htmlFor="">Password</label>
                <input type="password" {...register('password')} />
            </div>
            <div>
                <button className="btn btn-primary" disabled={isSubmitting}>Đăng nhập</button>
            </div>
        </form>
    )
}

export default SignIn
