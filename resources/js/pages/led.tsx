import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function LED() {
	const [isOn, setIsOn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const API_LED = '/api/led';
	const API_TOGGLE = '/api/led/toggle';

	useEffect(() => {
		async function load() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(API_LED);
				if (!res.ok) throw new Error('Error al obtener estado');
				const data = await res.json();
				setIsOn(Boolean(data.is_on));
			} catch (err) {
                console.log(err);
				setError('Error inesperado');
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);

	async function handleToggle() {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(API_TOGGLE, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});
			if (!res.ok) throw new Error('Error al cambiar estado');
			const data = await res.json();
			setIsOn(Boolean(data.is_on));
		} catch (err) {
            console.log(err);
			setError('Error inesperado');
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Head title='LED' />
			<div className='max-w-md mx-auto mt-12 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800'>
				<header className='flex items-center justify-between mb-4'>
					<h1 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>Control de LED</h1>
					<p className='text-sm text-gray-500 dark:text-gray-400'>Estado en base de datos</p>
				</header>

				<section className='flex items-center gap-5'>
					{/* LED visual */}
					<div className='flex items-center gap-4'>
						<div
							className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out
							${isOn ? 'bg-gradient-to-br from-green-400 to-green-600 ring-4 ring-green-300/60 shadow-2xl animate-pulse' : 'bg-gradient-to-br from-gray-300 to-gray-400 ring-2 ring-gray-200 shadow-md'}`}>
							{/* small inner circle for depth */}
							<div className={`${isOn ? 'w-8 h-8 rounded-full bg-white/30' : 'w-8 h-8 rounded-full bg-white/20'}`} />
						</div>

						<div>
							<p className='text-sm text-gray-500 dark:text-gray-400'>Estado actual</p>
							<p className='text-xl font-bold mt-1 text-gray-900 dark:text-gray-100'>{isOn === null ? '—' : isOn ? 'ON' : 'OFF'}</p>
						</div>
					</div>
				</section>

				{/* controls */}
				<div className='mt-6 flex items-center gap-3'>
					<button
						onClick={handleToggle}
						disabled={loading}
						className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
						${isOn ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 focus:ring-gray-300'}`}
					>
						{loading ? (
							<svg className='w-5 h-5 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
								<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
								<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
							</svg>
						) : (
							<span>{isOn ? 'Apagar' : 'Encender'}</span>
						)}
					</button>

					{/* estado actualizado */}
					{error && <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>}
				</div>

				{/* nota pequeña */}
				<p className='mt-4 text-xs text-gray-500 dark:text-gray-400'>Este componente usa rutas API en <code className='bg-gray-100 dark:bg-gray-800 px-1 rounded'>/api/led</code> y <code className='bg-gray-100 dark:bg-gray-800 px-1 rounded'>/api/led/toggle</code>.</p>
			</div>
		</>
	);
}
