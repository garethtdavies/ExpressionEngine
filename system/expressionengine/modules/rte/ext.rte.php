<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rte_ext {

	var $name = 'Rich Text Editor';
	var $version = '1,0';
	var $settings_exist = 'n';
	var $docs_url = 'http://expressionengine.com/user_guide/modules/rich-text-editor/index.html';
	var $required_by = array('module');

	private $EE;
	private $module = 'rte';
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		$this->EE =& get_instance();
	}

	// --------------------------------------------------------------------

	/**
	 * Handle hook call
	 */
	function myaccount_nav_setup()
	{
		$this->EE->lang->loadfile($this->module);
		return array(
			'customize_cp' => array(
				lang('rte_prefs')	=> array(
					'module'	=> $this->module,
					'method'	=> 'myaccount_settings'
				)
			)
		);
	}
	
	// --------------------------------------------------------------------

	/**
	 * Handle hook call
	 */
	function cp_menu_array( $menu )
	{
		$menu['admin']['admin_content']['rte_settings'] = BASE.AMP.'C=addons_modules'.AMP.'M=show_module_cp'.AMP.'module='.$this->module;
		return $menu;
	}
	
	// --------------------------------------------------------------------

	/**
	 * Handle hook call
	 */
	function content_publish_edit_form_data( $data )
	{
		
		include_once( APPPATH.'modules/'.$this->module.'/'.'mcp.'.$this->module.'.php' );
		$class_name	= ucfirst($this->module).'_mcp';
		$RTE		= new $class_name();
		
		# WysiHat
		$this->EE->cp->add_to_head($this->EE->view->head_link('css/rte.css'));
		$this->EE->cp->add_js_script(array('plugin' => 'wysihat'));
		
		# Toolset JS
		$this->EE->javascript->output(
			$RTE->build_toolset_js()
		);

		return $data;
	}
	
	// --------------------------------------------------------------------

	/**
	 * Activate Extension
	 */
	function activate_extension()
	{
		return TRUE;
		//show_error('This extension is automatically installed with the Rich Text Editor module');
	}

	// --------------------------------------------------------------------

	/**
	 * Update Extension
	 */
	function update_extension($current = FALSE)
	{
		return TRUE;
		//show_error('This extension is automatically updated with the Rich Text Editor module');
	}

	// --------------------------------------------------------------------

	/**
	 * Disable Extension
	 */
	function disable_extension()
	{
		return TRUE;
		//show_error('This extension is automatically deleted with the Rich Text Editor module');
	}
	
		// --------------------------------------------------------------------

	/**
	 * Disable Extension
	 */
	function uninstall_extension()
	{
		return TRUE;
		//show_error('This extension is automatically deleted with the Rich Text Editor module');
	}
	
}

/* End of file ext.rte.php */
/* Location: ./system/expressionengine/modules/rte/ext.rte.php */