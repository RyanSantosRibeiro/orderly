-- Create the logs table for orderly generations
CREATE TABLE IF NOT EXISTS public.orderly_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    config_id uuid NOT NULL,
    api_key text NOT NULL,
    product_image_url text,
    result_image_url text, -- Store the result URL (or base64 if small, but preferably URL)
    mode text,
    user_agent text,
    ip_address text,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    
    CONSTRAINT orderly_logs_pkey PRIMARY KEY (id),
    CONSTRAINT orderly_logs_config_id_fkey FOREIGN KEY (config_id) REFERENCES public.wearme_configs(id) ON DELETE CASCADE
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orderly_logs_config_id ON public.orderly_logs(config_id);
CREATE INDEX IF NOT EXISTS idx_orderly_logs_api_key ON public.orderly_logs(api_key);

-- Add comment
COMMENT ON TABLE public.orderly_logs IS 'Registry of all virtual try-on generations made via the widget.';
