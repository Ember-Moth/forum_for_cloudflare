import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaPasteImagePayload = {
	file: File;
	selectionStart: number;
	selectionEnd: number;
	target: HTMLTextAreaElement;
};

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	onImagePaste?: (payload: TextareaPasteImagePayload) => void;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, onImagePaste, onPaste, ...props }, ref) => {
	const handlePaste = React.useCallback(
		(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
			onPaste?.(event);
			if (event.defaultPrevented) return;

			const imageItem = Array.from(event.clipboardData?.items ?? []).find((item) => item.kind === 'file' && item.type.startsWith('image/'));
			const imageFile = imageItem?.getAsFile();
			if (!imageFile) return;

			event.preventDefault();
			onImagePaste?.({
				file: imageFile,
				selectionStart: event.currentTarget.selectionStart ?? 0,
				selectionEnd: event.currentTarget.selectionEnd ?? 0,
				target: event.currentTarget
			});
		},
		[onImagePaste, onPaste]
	);

	return (
		<textarea
			ref={ref}
			className={cn(
				'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			onPaste={handlePaste}
			{...props}
		/>
	);
});
Textarea.displayName = 'Textarea';

