<solution name="sConsole" outputdirectory="">	
	<project name="sconsole">
		<class name="sConsole">			
			<class name="modal">
				<js file="javascript/modal/init.js" />
				<js file="javascript/modal/window.js" />
				<js file="javascript/modal/busy.js" />
				<js file="javascript/modal/question.js" />
				<js file="javascript/modal/warning.js" />
				<js file="javascript/modal/error.js" />								
				<js file="javascript/modal/info.js" />
				<class name="chooser">
					<js file="javascript/modal/chooser/base.js" />
					<js file="javascript/modal/chooser/usergroup.js" />
					<js file="javascript/modal/chooser/media.js" />
					<js file="javascript/modal/chooser/mediatransformation.js" />
				</class>
				<class name="edit">
					<js file="javascript/modal/edit/profile.js" />
					<js file="javascript/modal/edit/changepassword.js" />
				</class>
			</class>			
			<class name="snapIn">
				<js file="javascript/snapin.js" />
			</class>				
			<class name="helpers">
				<js file="javascript/helpers.js" />
			</class>												
			<class name="runtime">
				<js file="javascript/runtime.js" />
			</class>		
			<class name="tinymce">
				<js file="javascript/tinymce.js" />
			</class>													
		</class>		
	</project>	
</solution>
